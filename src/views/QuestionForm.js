import React, { Component } from 'react';

class QuestionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: '',
      answer: '',
      distractors: ''
    };

    this.bHandleChange = this.handleChange.bind(this);
    this.bHandleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;

    this.setState({
      [target.name]: target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.saveFunc(this.state);
  }

  render() {
    // This could be done using React Bootstrap elements but "if it ain't broke"
    return (
      <form className="form-horizontal" onSubmit={this.bHandleSubmit}>
        <div className="form-group">
          <label htmlFor="inputQuestion"
            className="control-label col-sm-3">Question</label>
          <div className="col-sm-8">
            <input type="text" className="form-control" id="inputQuestion"
              name="question" placeholder="What's 2+2?" required
              value={this.props.question} onChange={this.bHandleChange}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputAnswer"
            className="control-label col-sm-3">Answer</label>
          <div className="col-sm-8">
            <input type="text" className="form-control" id="inputAnswer"
              name="answer" placeholder="4" required
              value={this.props.answer} onChange={this.bHandleChange}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputDistractors"
            className="control-label col-sm-3">Incorrect Answers</label>
          <div className="col-sm-8">
            <input type="text" className="form-control" id="inputDistractors"
              name="distractors" placeholder="5, 7" required
              value={this.props.distractors} onChange={this.bHandleChange}/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-8">
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </div>
      </form>
    );
  }
}

export default QuestionForm;
