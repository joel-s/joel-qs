import React, { Component } from 'react';

class CreateQuestion extends Component {
  render() {
    return (
      <div className="CreateQuestion jumbotron">
        <div className="row">
        <div className="col-md-offset-2 col-md-8">
          <form className="form-horizontal">
            <h1>Create a question</h1>
            <div className="form-group">
                <label htmlFor="inputEmail" className="control-label col-xs-2">Email</label>
                <div className="col-xs-10">
                    <input type="email" className="form-control" id="inputEmail" placeholder="Email" />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="inputPassword" className="control-label col-xs-2">Password</label>
                <div className="col-xs-10">
                    <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
                </div>
            </div>
            <div className="form-group">
                <div className="col-xs-offset-2 col-xs-10">
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
