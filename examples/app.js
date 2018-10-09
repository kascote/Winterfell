import React from 'react';
import ReactDOM from 'react-dom';
import Winterfell from '../src/index';

import schema from './schema';
import loginSchema from './loginSchema';
import PanelExample from './panelExample';

var onRender = () => {
  console.log('Great news! Winterfell rendered successfully');
};

var onUpdate = questionAnswers => {
  console.log('Question Updated! The current set of answers is: ', questionAnswers);
};
var onSwitchPanel = panel => {
  console.log('Moving on to the panel that is identified as "' + panel.panelId + '"');
};

var onSubmit = (questionAnswers, target) => {
  console.log('Form submitted!', questionAnswers);
  console.log('-----');
  console.log('For this example, we disabled normal form submission functionality. ');
  console.log('-----');
  alert('Submitted. Check the console to see the answers!');
};

window.onload = function() {
  ReactDOM.render(
    <Winterfell
      schema={loginSchema}
      onRender={onRender}
      onUpdate={onUpdate}
      renderRequiredAsterisk={() => <span>{'*'}</span>}
    />,
    document.getElementById('login-form')
  );

  ReactDOM.render(
    <Winterfell
      schema={schema}
      disableSubmit={true}
      onRender={onRender}
      onUpdate={onUpdate}
      onSwitchPanel={onSwitchPanel}
      onSubmit={onSubmit}
    />,
    document.getElementById('form')
  );

  ReactDOM.render(<PanelExample />, document.getElementById('pane-form'));

  /*
   * JSON View
   */
  // $('#json-view').JSONView($('#json-view').html());

  // $('#login-json-view').JSONView($('#login-json-view').html());
};
