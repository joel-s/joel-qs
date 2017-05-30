import React, { Component } from 'react';
import { Redirect } from 'react-router';
import '../AllQuestions';   // for window.allQuestions

/**
 * Delete a question (prompt for Delete/Cancel).
 */
class DeleteQuestion extends Component {
  constructor(props) {
    super(props);

    this.qID = +props.match.params._id;   // convert string to integer
    const q = window.allQuestions.getQuestion(this.qID);
    if (q !== undefined) {
      this.question = q.question;
      this.answer = q.answer;
      this.distractors = q.distractors;
    }

    this.state = {
      done: false,
    }
  }

  doDelete(event) {
    event.preventDefault();
    let promise = window.allQuestions.deleteQuestion(this.qID);
    promise.then((response) => this.setState({ done: true }))
      .catch((error) => alert(error));
  }

  cancelDelete(event) {
    event.preventDefault();
    this.setState({ done: true });
  }

  render() {
    if (this.state.done || this.question === undefined) {
      return <Redirect to="/" push />
    }
    return (
      <div className="DeleteQuestion jumbotron">
        <div className="row">
            <h2 className="text-center">Delete question?<br />&nbsp;</h2>
            <p><strong>Question:</strong> {this.question}</p>
            <p><strong>Answer:</strong> {this.answer}</p>
            <p><strong>Distractors:</strong> {this.distractors}</p>
            <form className="form-horizontal"
              onSubmit={this.doDelete.bind(this)}>
              <div className="form-group text-center">
                <button type="submit" className="btn btn-primary">Delete
                  </button>
                {" "}
                <button className="btn btn-default"
                  onClick={this.cancelDelete.bind(this)}>Cancel</button>
              </div>
            </form>
        </div>
      </div>
    );
  }
}

export default DeleteQuestion;
