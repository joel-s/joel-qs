import React, { Component } from 'react';
import QuestionForm from './QuestionForm';
import '../AllQuestions';   // for window.allQuestions

/**
 * Create a new question.
 */
class CreateQuestion extends Component {
  render() {
    return (
      <div className="CreateQuestion jumbotron">
        <div className="row">
          <div className="col-sm-offset-2 col-sm-8">
            <h2 className="text-center">Create a question<br />&nbsp;</h2>
            <QuestionForm saveFunc={this.saveNew.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }

  saveNew(state) {
    const { question, answer, distractors } = state;
    return window.allQuestions.addQuestion({question, answer, distractors});
  }
}

export default CreateQuestion;
