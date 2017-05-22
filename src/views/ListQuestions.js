import React, { Component } from 'react';
import '../AllQuestions';   // for window.allQuestions


class ListQuestions extends Component {

  constructor(props) {
    super(props);

    let qs = window.allQuestions.getQuestions();
    if (typeof qs.length === "number") {
      let questions = qs.map(({ id, question, answer, distractors }) =>
        ({ id, question, answer, distractors }));
      this.state = { questions };
    } else {
      this.state = { questions: null };
      qs.then(response => {
        const qEntities = response.body();
        let questions = [];
        for (let qEntity of qEntities) {
          const { id, question, answer, distractors } = qEntity.data();
          questions.push({ id, question, answer, distractors });
        }
        this.setState({ questions });
      });
    }
  }

  render() {
    return (
      <div className="ListQuestions">
        <h1>Questions</h1>
        <ul>{
          (this.state.questions === null) ?
            <li key={-1}>Loading questions...</li> :
            this.state.questions.map(({ id, question, answer, distractors }) =>
              <li key={id}>{id} | {question} | {answer} | {distractors}</li>)
        }</ul>
      </div>
    );
  }
}

export default ListQuestions;
