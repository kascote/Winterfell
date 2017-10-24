import React, { Component } from 'react'
var Winterfell   = require('../src/index');
var panesSchema  = require('./panesSchema');

class PenelExample extends Component {

  constructor() {
    super(...arguments)

    this.state = {
      currentPanel: 'questions-1'
    }

    this.onRender = this.onRender.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onSwitchPanel = this.onSwitchPanel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClickPanel = this.onClickPanel.bind(this);
  }

  onRender() {
    console.log('Great news! Winterfell rendered successfully');
  };

  onUpdate(questionAnswers) {
    console.log('Question Updated! The current set of answers is: ', questionAnswers);
  };

  onSwitchPanel(panel) {
    console.log('Moving on to the panel that is identified as "' + panel.panelId + '"');
  };

  onSubmit(questionAnswers, target) {
    console.log('Form submitted!', questionAnswers);
    console.log('-----');
    console.log('For this example, we disabled normal form submission functionality. ');
    console.log('-----');
    console.log('purged answers:', Winterfell.purgeQuestionAnswers(panesSchema.questionSets[0].questions, questionAnswers));
  };

  onClickPanel(ev) {
    ev.preventDefault();
    let panel = ev.target.dataset.pane;
    this.setState(() => {
      return { currentPanel: panel }
    });
  }

  isActive(pane) {
    return pane === this.state.currentPanel ? 'active' : ''
  }


  render() {
    return(
      <div className="panel-example">
        <ul id="questions-pane" className="nav nav-tabs" onClick={ this.onClickPanel }>
          <li role="presentation" className={this.isActive('questions-1')}><a data-pane='questions-1' href="#">Questions #1</a></li>
          <li role="presentation" className={this.isActive('questions-2')}><a data-pane='questions-2' href="#">Questions #2</a></li>
          <li role="presentation" className={this.isActive('questions-3')}><a data-pane='questions-3' href="#">Questions #3</a></li>
        </ul>
        <Winterfell schema={panesSchema}
                    disableSubmit={true}
                    onRender={this.onRender}
                    onUpdate={this.onUpdate}
                    onSwitchPanel={this.onSwitchPanel}
                    onSubmit={this.onSubmit}
                    panelId={this.state.currentPanel} />
      </div>
    )
  }

}

export default PenelExample
