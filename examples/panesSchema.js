module.exports = {
  "classes" : {
    "form" : "login-form",
    "question" : "form-group",
    "input" : "form-control",
    "controlButton" : "btn btn-primary pull-right",
    "backButton" : "btn btn-default pull-left",
    "errorMessage" : "alert alert-danger",
    "buttonBar" : "button-bar"
  },
  "display": {
    "panels": "visible"
  },
  "formPanels" : [
    {
      "index" : 1,
      "panelId" : "questions-1"
    },
    {
      "index" : 2,
      "panelId" : "questions-2"
    },
    {
      "index" : 3,
      "panelId" : "questions-3"
    }
  ],
  "questionPanels" : [
    {
      "panelId": "questions-1",
      "panelHeader" : "Questions 1",
      "panelText" : "text for questions 1",
      "questionSets" : [{
        "index" : 1,
        "questionSetId" : "questionSet-1"
      }]
    },
    {
      "panelId": "questions-2",
      "panelHeader" : "Questions 2",
      "panelText" : "text for questions 2",
      "questionSets" : [{
        "index" : 1,
        "questionSetId" : "questionSet-2"
      }]
    },
    {
      "panelId": "questions-3",
      "panelHeader" : "Questions 3",
      "panelText" : "text for questions 3",
      "questionSets" : [{
        "index" : 1,
        "questionSetId" : "questionSet-3"
      }]
    }
  ],
  "questionSets" : [
    {
      "questionSetId" : "questionSet-1",
      "questions" : [{
        "questionId" : "email",
        "question" : "Email Address",
        "input" : {
          "type" : "emailInput",
          "placeholder" : "Email Address",
          "required" : true
        },
        "validations" : [{
          "type" : "isEmail"
        }]
      }]

    },
    {
      "questionSetId" : "questionSet-2",
      "questions" : [{
        "questionId" : "password",
        "question" : "Password",
        "input" : {
          "type" : "passwordInput",
          "placeholder" : "Password"
        },
        "validations" : [{
          "type" : "isLength",
          "params" : [1]
        }]
      }]
    },
    {
      "questionSetId" : "questionSet-3",
      "questions" : [{
        "questionId" : "passwordConfirm",
        "question" : "Confirm Password",
        "input" : {
          "type" : "passwordInput",
          "placeholder" : "Confirm Password"
        },
        "validations" : [{
          "type" : "equals",
          "params" : ['{password}'],
          "message" : "Confirm Password must match Password"
        }]
      }]
    }
  ]
}