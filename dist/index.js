'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');
var _ = require('lodash').noConflict();

var QuestionPanel = require('./questionPanel');

var Winterfell = (function (_React$Component) {
  _inherits(Winterfell, _React$Component);

  function Winterfell(props) {
    _classCallCheck(this, Winterfell);

    _get(Object.getPrototypeOf(Winterfell.prototype), 'constructor', this).call(this, props);

    this.formComponent = null;

    // Set our default values for props.
    var props = _.extend({
      schema: {
        formPanels: [],
        questionPanels: [],
        questionSets: [],
        classes: {}
      },
      questionAnswers: {},
      ref: 'form',
      encType: 'application/x-www-form-urlencoded',
      method: 'POST',
      action: '',
      panelId: undefined,
      disableSubmit: false,
      renderError: undefined,
      renderRequiredAsterisk: undefined
    }, this.props);

    this.panelHistory = [];

    var schema = _.extend({
      classes: {},
      formPanels: [],
      questionPanels: [],
      questionSets: []
    }, props.schema);

    schema.formPanels = schema.formPanels.sort(function (a, b) {
      return a.index > b.index;
    });

    var panelId = typeof props.panelId !== 'undefined' ? props.panelId : schema.formPanels.length > 0 ? schema.formPanels[0].panelId : undefined;

    var currentPanel = typeof schema !== 'undefined' && typeof schema.formPanels !== 'undefined' && typeof panelId !== 'undefined' ? _.find(schema.formPanels, function (panel) {
      return panel.panelId == panelId;
    }) : undefined;

    if (!currentPanel) {
      throw new Error('Winterfell: Could not find initial panel and failed to render.');
    }

    this.state = {
      schema: schema,
      currentPanel: currentPanel,
      action: props.action,
      questionAnswers: props.questionAnswers
    };
  }

  _createClass(Winterfell, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this = this;

      this.setState({
        action: nextProps.action,
        schema: nextProps.schema,
        questionAnswers: Object.assign({}, nextProps.questionAnswers, this.state.questionAnswers)
      }, function () {
        if (nextProps.panelId !== undefined) {
          _this.handleSwitchPanel(nextProps.panelId, true);
        }
      });
    }
  }, {
    key: 'handleAnswerChange',
    value: function handleAnswerChange(questionId, questionAnswer, questionSetId) {

      var questionAnswers = _.chain(this.state.questionAnswers).set(questionId, questionAnswer).value();

      this.removeEmptyAnswers(questionAnswers, questionId, questionAnswer, questionSetId);

      this.setState({
        questionAnswers: questionAnswers
      }, this.props.onUpdate.bind(null, questionAnswers));
    }
  }, {
    key: 'removeEmptyAnswers',
    value: function removeEmptyAnswers(questionAnswers, questionId, questionAnswer, questionSetId) {
      var _this2 = this;

      // get the questionSet where replied
      var qs = this.props.schema.questionSets.filter(function (qs) {
        return qs.questionSetId === questionSetId;
      });
      if (qs.length === 0) {
        return;
      }
      // get the answered question
      var reply = this.searchQuestion(qs[0].questions, questionId);
      if (reply.length === 0) {
        return;
      }
      // get the options that *not match* the answered question
      var answ = "";
      if (questionAnswer instanceof Array) {
        answ = reply[0].input.options.filter(function (o) {
          return _.findIndex(questionAnswer, function (x) {
            return o.value === x;
          }) < 0;
        });
      } else {
        answ = reply[0].input.options.filter(function (o) {
          return o.value !== questionAnswer;
        });
      }

      // lets go
      answ.forEach(function (a) {
        _this2.removeAnswers(questionAnswers, a.conditionalQuestions);
      });

      var rpl = questionAnswers[reply[0].questionId];
      if (rpl instanceof Array && rpl.length === 0) {
        delete questionAnswers[reply[0].questionId];
      }
    }

    // Transverse the question down to the selected one
  }, {
    key: 'searchQuestion',
    value: function searchQuestion(questions, questionId) {
      var _this3 = this;

      var r = questions.filter(function (q) {
        return q.questionId === questionId;
      });
      if (r.length === 1) {
        return r;
      }

      questions.every(function (q) {
        var x = q.input.options.every(function (o) {
          if (o.conditionalQuestions.length > 0) {
            r = _this3.searchQuestion(o.conditionalQuestions, questionId);
            return !(r.length > 0);
          }
        });
        return !(r.length > 0);
      });
      return r;
    }

    // down the rabit hole removing all the answers
  }, {
    key: 'removeAnswers',
    value: function removeAnswers(questionAnswers, questions) {
      var _this4 = this;

      questions.forEach(function (cq) {
        cq.input.options.forEach(function (o) {
          _this4.removeAnswers(questionAnswers, o.conditionalQuestions);
        });
        delete questionAnswers[cq.questionId];
      });
    }
  }, {
    key: 'handleSwitchPanel',
    value: function handleSwitchPanel(panelId, preventHistory) {
      var panel = _.find(this.props.schema.formPanels, {
        panelId: panelId
      });

      if (!panel) {
        throw new Error('Winterfell: Tried to switch to panel "' + panelId + '", which does not exist.');
      }

      if (!preventHistory) {
        this.panelHistory.push(panel.panelId);
      }

      this.setState({
        currentPanel: panel
      }, this.props.onSwitchPanel.bind(null, panel));
    }
  }, {
    key: 'handleBackButtonClick',
    value: function handleBackButtonClick() {
      this.panelHistory.pop();

      this.handleSwitchPanel.call(this, this.panelHistory[this.panelHistory.length - 1], true);
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(action) {
      var _this5 = this;

      if (this.props.disableSubmit) {
        this.props.onSubmit(this.state.questionAnswers, action);
        return;
      }

      /*
       * If we are not disabling the functionality of the form,
       * we need to set the action provided in the form, then submit.
       */
      this.setState({
        action: action
      }, function () {
        if (!_this5.formComponent) {
          return;
        }

        _this5.formComponent.submit();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var currentPanel = _.find(this.state.schema.questionPanels, function (panel) {
        return panel.panelId == _this6.state.currentPanel.panelId;
      });

      return React.createElement(
        'form',
        { method: this.props.method,
          encType: this.props.encType,
          action: this.state.action,
          ref: function (ref) {
            return _this6.formComponent = ref;
          },
          className: this.state.schema.classes.form },
        React.createElement(
          'div',
          { className: this.state.schema.classes.questionPanels },
          React.createElement(QuestionPanel, { schema: this.state.schema,
            classes: this.state.schema.classes,
            panelId: currentPanel.panelId,
            panelIndex: currentPanel.panelIndex,
            panelHeader: currentPanel.panelHeader,
            panelText: currentPanel.panelText,
            action: currentPanel.action,
            button: currentPanel.button,
            backButton: currentPanel.backButton,
            questionSets: currentPanel.questionSets,
            questionAnswers: this.state.questionAnswers,
            panelHistory: this.panelHistory,
            renderError: this.props.renderError,
            renderRequiredAsterisk: this.props.renderRequiredAsterisk,
            onAnswerChange: this.handleAnswerChange.bind(this),
            onPanelBack: this.handleBackButtonClick.bind(this),
            onSwitchPanel: this.handleSwitchPanel.bind(this),
            onSubmit: this.handleSubmit.bind(this) })
        )
      );
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.panelHistory.push(this.state.currentPanel.panelId);
      this.props.onRender();
    }
  }]);

  return Winterfell;
})(React.Component);

;

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
};

Winterfell.inputTypes = require('./inputTypes');
Winterfell.errorMessages = require('./lib/errors');
Winterfell.validation = require('./lib/validation');

Winterfell.addInputType = Winterfell.inputTypes.addInputType;
Winterfell.addInputTypes = Winterfell.inputTypes.addInputTypes;

Winterfell.addErrorMessage = Winterfell.errorMessages.addErrorMessage;
Winterfell.addErrorMessages = Winterfell.errorMessages.addErrorMessages;

Winterfell.addValidationMethod = Winterfell.validation.addValidationMethod;
Winterfell.addValidationMethods = Winterfell.validation.addValidationMethods;

Winterfell.purgeQuestionAnswers = Winterfell.validation.purgeQuestionAnswers;

Winterfell.defaultProps = {
  onSubmit: function onSubmit() {},
  onUpdate: function onUpdate() {},
  onSwitchPanel: function onSwitchPanel() {},
  onRender: function onRender() {}
};

module.exports = Winterfell;