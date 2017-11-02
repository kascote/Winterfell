module.exports = {
  "classes": {
    "input": "form-control",
    "select": "form-control",
    "question": "form-group",
    "radioListItem": "radio",
    "radioList": "clean-list",
    "checkboxInput": "checkbox",
    "checkboxListItem": "checkbox",
    "checkboxList": "clean-list",
    "controlButton": "btn btn-primary pull-right",
    "backButton": "btn btn-default pull-left",
    "errorMessage": "alert alert-danger",
    "questionPostText": "push-top",
    "buttonBar": "button-bar"
  },
  "formPanels": [{
    "index": 1,
    "panelId": "questions-1"
  }, {
    "index": 2,
    "panelId": "questions-2"
  }],
  "questionPanels": [{
    "panelId": "questions-1",
    "panelHeader": "Panel 1",
    "action": {
      "default": {
        "action": "SUBMIT"
      }
    },
    "button": {
      "text": "Guardar",
      "disabled": true
    },
    "backButton": {
      "disabled": true
    },
    "questionSets": [{
      "index": 1,
      "questionSetId": "cj6f7piqf00023t5qb01tmcbl"
    }]
  }, {
    "panelId": "questions-2",
    "panelHeader": "Panel 2",
    "questionSets": [{
      "index": 1,
      "questionSetId": "cj6f7piqg00033t5q3ejlcmbn"
    }]
  }],
  "questionSets": [{
    "questionSetId": "cj6f7piqf00023t5qb01tmcbl",
    "questions": [{
      "questionId": "cj6caf3zr00013t5pmg1fs1gl",
      "question": "Está inscripto en Ganancias ?",
      "input": {
        "type": "radioOptionsInput",
        "options": [{
          "text": "Si",
          "value": "si",
          "conditionalQuestions": [{
            "questionId": "cj6cansfy00103t5px3sbbnyk",
            "question": "En que Categoría",
            "assigned_to": "cj6caf3zr00023t5pazx3id21",
            "input": {
              "type": "radioOptionsInput",
              "options": [{
                "text": "Categoría A",
                "value": "a",
                "conditionalQuestions": []
              }, {
                "text": "Categoría B",
                "value": "b",
                "conditionalQuestions": []
              }, {
                "text": "Categoría C",
                "value": "c",
                "conditionalQuestions": []
              }]
            }
          }]
        }, {
          "text": "No",
          "value": "no",
          "conditionalQuestions": []
        }]
      }
    },
    {
      "questionId": "11111af3zr00013t5pmg1fs1gl",
      "question": "Estado de la Planta",
      "input": {
        "type": "radioOptionsInput",
        "options": [
          {
            "text": "Limpia",
            "value": "limpia",
            "conditionalQuestions": [],
          },
          {
            "text": "Sucia",
            "value": "sucia",
            "conditionalQuestions": [
              {
                "questionId": "192929292929292",
                "question": "Que Tan Sucia",
                "assigned_to": "jdjdjddjdjdj",
                "input": {
                  "type": "checkboxOptionsInput",
                  "options": [
                    {
                      "text": "Mucho",
                      "value": "mucho",
                      "conditionalQuestions": []
                    },
                    {
                      "text": "Poco",
                      "value": "poco",
                      "conditionalQuestions": []
                    },
                    {
                      "text": "Alto",
                      "value": "algo",
                      "conditionalQuestions": []
                    }
                  ]

                }
              }
            ],
          },
          {
            "text": "SoS",
            "value": "sos",
            "conditionalQuestions": [],
          }
        ]
      }
    },
    {
      "questionId": "cj6caf3zr00043t5pocit8x7o",
      "question": "Cuales son sus comidas favoritas ?",
      "input": {
        "type": "checkboxOptionsInput",
        "options": [{
          "text": "Milanesas",
          "value": "milanesas",
          "conditionalQuestions": [{
            "questionId": "cj6cago9a000e3t5p7j4doghv",
            "question": "Milanesas con ...",
            "assigned_to": "cj6caf3zr00053t5p8gknhrqg",
            "input": {
              "type": "checkboxOptionsInput",
              "options": [{
                "text": "Papa fritas",
                "value": "papas",
                "conditionalQuestions": []
              }, {
                "text": "Huevo Frito",
                "value": "huevos",
                "conditionalQuestions": [{
                  "questionId": "cj6cajv1a000q3t5prnu6a69a",
                  "question": "Que Tipo de huevo",
                  "assigned_to": "cj6cahlls000h3t5p69a1ayu0",
                  "input": {
                    "type": "radioOptionsInput",
                    "options": [{
                      "text": "Sobre la Milanesa",
                      "value": "sobre",
                      "conditionalQuestions": []
                    }, {
                      "text": "Al costado",
                      "value": "costado",
                      "conditionalQuestions": []
                    }]
                  }
                }]
              }, {
                "text": "Ensalada mixta",
                "value": "mixta",
                "conditionalQuestions": []
              }]
            }
          }]
        }, {
          "text": "Ravioles",
          "value": "ravioles",
          "conditionalQuestions": [{
            "questionId": "cj6cai8ts000j3t5p8yjala9d",
            "question": "Con que salsa ?",
            "assigned_to": "cj6caf3zr00063t5piylnjm3v",
            "input": {
              "type": "radioOptionsInput",
              "options": [{
                "text": "Scarparo",
                "value": "scarparo",
                "conditionalQuestions": []
              }, {
                "text": "Rose",
                "value": "rose",
                "conditionalQuestions": []
              }, {
                "text": "Bolognesa",
                "value": "bolognesa",
                "conditionalQuestions": []
              }]
            }
          }]
        }, {
          "text": "Asado",
          "value": "Asado",
          "conditionalQuestions": []
        }, {
          "text": "Sopa",
          "value": "Sopa",
          "conditionalQuestions": []
        }]
      }
    }]
  }, {
    "questionSetId": "cj6f7piqg00033t5q3ejlcmbn",
    "questions": [{
      "questionId": "cj6caf3zr000a3t5p59shassn",
      "question": "Sarasa",
      "input": {
        "type": "radioOptionsInput",
        "options": [{
          "text": "test 1",
          "value": "test 2",
          "conditionalQuestions": []
        }]
      }
    }]
  }]
}