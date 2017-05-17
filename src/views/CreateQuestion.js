import React, { Component } from 'react';
import QuestionForm from './QuestionForm';
import '../AllQuestions';   // for window.allQuestions

function saveNew(state) {
  const {question, answer, distractors} = state;
  alert(`q=${question}, a=${answer}, d=${distractors}`);
  window.allQuestions.addQuestion({question, answer, distractors});
}

class CreateQuestion extends Component {
  render() {
    return (
      <div className="CreateQuestion jumbotron">
        <div className="row">
          <div className="col-sm-offset-2 col-sm-8">
            <h2 className="text-center">Create a question<br />&nbsp;</h2>
            <QuestionForm saveFunc={saveNew}/>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateQuestion;
