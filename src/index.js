var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');
var _     = require('lodash').noConflict();

var QuestionPanel = require('./questionPanel');

class Winterfell extends React.Component {

  constructor(props) {
    super(props);

    this.formComponent = null;

    // Set our default values for props.
    var props = _.extend({
      schema                 : {
        formPanels     : [],
        questionPanels : [],
        questionSets   : [],
        classes        : {}
      },
      questionAnswers        : {},
      ref                    : 'form',
      encType                : 'application/x-www-form-urlencoded',
      method                 : 'POST',
      action                 : '',
      panelId                : undefined,
      disableSubmit          : false,
      renderError            : undefined,
      renderRequiredAsterisk : undefined
    }, this.props);

    this.panelHistory = [];

    var schema = _.extend({
      classes        : {},
      formPanels     : [],
      questionPanels : [],
      questionSets   : [],
    }, props.schema);

    schema.formPanels = schema.formPanels
                              .sort((a, b) => a.index > b.index);

    var panelId = (typeof props.panelId !== 'undefined'
                     ? props.panelId
                     : schema.formPanels.length > 0
                         ? schema.formPanels[0].panelId
                         : undefined);

    var currentPanel = typeof schema !== 'undefined'
                         && typeof schema.formPanels !== 'undefined'
                         && typeof panelId !== 'undefined'
                         ? _.find(schema.formPanels,
                               panel => panel.panelId == panelId)
                         : undefined;

    if (!currentPanel) {
      throw new Error('Winterfell: Could not find initial panel and failed to render.');
    }

    this.state = {
      schema          : schema,
      currentPanel    : currentPanel,
      action          : props.action,
      questionAnswers : props.questionAnswers
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        action          : nextProps.action,
        schema          : nextProps.schema,
        questionAnswers : Object.assign({}, nextProps.questionAnswers, this.state.questionAnswers),
      },
      () => {
        if (nextProps.panelId !== undefined) {
          this.handleSwitchPanel(nextProps.panelId, true);
        }
      }
    )
  }

  handleAnswerChange(questionId, questionAnswer, questionSetId) {


    var questionAnswers = _.chain(this.state.questionAnswers)
                           .set(questionId, questionAnswer)
                           .value();

    this.removeEmptyAnswers(questionAnswers, questionId, questionAnswer, questionSetId)

    this.setState({
      questionAnswers : questionAnswers,
    }, this.props.onUpdate.bind(null, questionAnswers));
  }

  removeEmptyAnswers(questionAnswers, questionId, questionAnswer, questionSetId) {
    // get the questionSet where replied
    var qs = this.props.schema.questionSets.filter(qs => qs.questionSetId === questionSetId)
    if (qs.length === 0) {
      return
    }
    // get the answered question
    var reply = this.searchQuestion(qs[0].questions, questionId)
    if (reply.length === 0) {
      return
    }
    // get the options that *not match* the answered question
    var answ = ""
    if (questionAnswer instanceof Array) {
      answ = reply[0].input.options.filter( o => _.findIndex(questionAnswer, (x) => o.value === x) < 0 )
    } else {
      answ = reply[0].input.options.filter( o => o.value !== questionAnswer)
    }

    // lets go
    answ.forEach((a) => {
      this.removeAnswers(questionAnswers, a.conditionalQuestions)
    })

    var rpl = questionAnswers[reply[0].questionId]
    if (( rpl instanceof Array) && (rpl.length === 0)) {
      delete questionAnswers[reply[0].questionId]
    }
  }

  // Transverse the question down to the selected one
  searchQuestion( questions, questionId) {

    var r = questions.filter( q => q.questionId === questionId)
    if (r.length === 1) {
      return r
    }

    questions.every((q) => {
      var x = q.input.options.every((o) => {
        if (o.conditionalQuestions.length > 0) {
          r = this.searchQuestion(o.conditionalQuestions, questionId)
          return (r.length === 0)
        } else {
          return true
        }
      })
      return (r.length === 0)
    })
    return r
  }


  // down the rabit hole removing all the answers
  removeAnswers(questionAnswers, questions) {
    questions.forEach((cq) => {
      cq.input.options.forEach( (o) => {
        this.removeAnswers( questionAnswers, o.conditionalQuestions )
      })
      delete questionAnswers[cq.questionId]
    })
  }

  handleSwitchPanel(panelId, preventHistory) {
    var panel = _.find(this.props.schema.formPanels, {
      panelId : panelId
    });

    if (!panel) {
      throw new Error('Winterfell: Tried to switch to panel "'
                      + panelId + '", which does not exist.');
    }

    if (!preventHistory) {
      this.panelHistory.push(panel.panelId);
    }

    this.setState({
      currentPanel : panel
    }, this.props.onSwitchPanel.bind(null, panel));
  }

  handleBackButtonClick() {
    this.panelHistory.pop();

    this.handleSwitchPanel.call(
      this, this.panelHistory[this.panelHistory.length - 1], true
    );
  }

  handleSubmit(action) {
    if (this.props.disableSubmit) {
      this.props.onSubmit(this.state.questionAnswers, action);
      return;
    }

    /*
     * If we are not disabling the functionality of the form,
     * we need to set the action provided in the form, then submit.
     */
    this.setState({
      action : action
    }, () => {
      if (!this.formComponent) {
        return;
      }

      this.formComponent.submit();
    });
  }

  render() {
    var currentPanel = _.find(this.state.schema.questionPanels,
                          panel => panel.panelId == this.state.currentPanel.panelId);

    return (
      <form method={this.props.method}
            encType={this.props.encType}
            action={this.state.action}
            ref={ref => this.formComponent = ref}
            className={this.state.schema.classes.form}>
        <div className={this.state.schema.classes.questionPanels}>
          <QuestionPanel schema={this.state.schema}
                         classes={this.state.schema.classes}
                         panelId={currentPanel.panelId}
                         panelIndex={currentPanel.panelIndex}
                         panelHeader={currentPanel.panelHeader}
                         panelText={currentPanel.panelText}
                         action={currentPanel.action}
                         button={currentPanel.button}
                         backButton={currentPanel.backButton}
                         questionSets={currentPanel.questionSets}
                         questionAnswers={this.state.questionAnswers}
                         panelHistory={this.panelHistory}
                         renderError={this.props.renderError}
                         renderRequiredAsterisk={this.props.renderRequiredAsterisk}
                         onAnswerChange={this.handleAnswerChange.bind(this)}
                         onPanelBack={this.handleBackButtonClick.bind(this)}
                         onSwitchPanel={this.handleSwitchPanel.bind(this)}
                         onSubmit={this.handleSubmit.bind(this)} />
        </div>
      </form>
    );
  }

  componentDidMount() {
    this.panelHistory.push(this.state.currentPanel.panelId);
    this.props.onRender();
  }

};

Winterfell.propTypes = {
  schema: PropTypes.object.isRequired,
  panelId: PropTypes.string,
  ref: PropTypes.string,
  encType: PropTypes.string,
  method: PropTypes.string,
  action: PropTypes.string,
  disableSubmit: PropTypes.bool,
  questionAnswers: PropTypes.object,
  renderError: PropTypes.func,
  renderRequiredAsterisk: PropTypes.func
}

Winterfell.inputTypes    = require('./inputTypes');
Winterfell.errorMessages = require('./lib/errors');
Winterfell.validation    = require('./lib/validation');

Winterfell.addInputType  = Winterfell.inputTypes.addInputType;
Winterfell.addInputTypes = Winterfell.inputTypes.addInputTypes;

Winterfell.addErrorMessage  = Winterfell.errorMessages.addErrorMessage;
Winterfell.addErrorMessages = Winterfell.errorMessages.addErrorMessages;

Winterfell.addValidationMethod  = Winterfell.validation.addValidationMethod;
Winterfell.addValidationMethods = Winterfell.validation.addValidationMethods;

Winterfell.purgeQuestionAnswers = Winterfell.validation.purgeQuestionAnswers

Winterfell.defaultProps = {
  onSubmit      : () => {},
  onUpdate      : () => {},
  onSwitchPanel : () => {},
  onRender      : () => {}
};

module.exports = Winterfell;
