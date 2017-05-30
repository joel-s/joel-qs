import React, { Component } from 'react';
import { Redirect } from 'react-router';
import QuestionForm from './QuestionForm';
import '../AllQuestions';   // for window.allQuestions

/**
 * Edit an existing question.
 */
class EditQuestion extends Component {
  constructor(props) {
    super(props);

    this.qID = +props.match.params._id;   // convert string to integer
    const q = window.allQuestions.getQuestion(this.qID);
    if (q !== undefined) {
      this.question = q.question;
      this.answer = q.answer;
      this.distractors = q.distractors;
    }

    this.bSaveChanges = this.saveChanges.bind(this);
  }

  render() {
    if (this.question === undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="EditQuestion jumbotron">
        <div className="row">
          <div className="col-sm-offset-2 col-sm-8">
            <h2 className="text-center">Edit question<br />&nbsp;</h2>
            <QuestionForm saveFunc={this.bSaveChanges}
              question={this.question} answer={this.answer}
              distractors={this.distractors}/>
          </div>
        </div>
      </div>
    );
  }

  saveChanges(state) {
    return window.allQuestions.updateQuestion(this.qID, state);
  }
}

export default EditQuestion;
