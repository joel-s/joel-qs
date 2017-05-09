import React, { Component } from 'react';

class CreateQuestion extends Component {
  render() {
    return (
      <div className="CreateQuestion jumbotron">
        <div className="row">
          <div className="col-sm-offset-2 col-sm-8">
            <h2 className="text-center">Create a question<br />&nbsp;</h2>
              <form className="form-horizontal">
                <div className="form-group">
                  <label htmlFor="inputQuestion" className="control-label col-sm-3">Question</label>
                  <div className="col-sm-8">
                    <input type="text" className="form-control" id="inputQuestion" name="question" placeholder="What's 2+2?" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="inputAnswer" className="control-label col-sm-3">Answer</label>
                  <div className="col-sm-8">
                    <input type="text" className="form-control" id="inputAnswer" name="answer" placeholder="4" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="inputAnswer" className="control-label col-sm-3">Incorrect Answers</label>
                  <div className="col-sm-8">
                    <input type="text" className="form-control" id="inputAnswer" name="answer" placeholder="5, 7" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-offset-3 col-sm-8">
                    <button type="submit" className="btn btn-primary">Save</button>
                  </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateQuestion;
