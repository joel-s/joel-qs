import React, { Component } from 'react';
import { Navbar, Table } from 'react-bootstrap';
import { FormGroup, FormControl, Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
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
        <LQControls />
        <LQTable />
        <LQLinks />

        {/* Temporary... */}
        <h2>Questions</h2>
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

class LQControls extends Component {
  render() {
    return (
      <div className="LQControls">
        <Navbar>
           <Navbar.Form pullLeft>
             <FormGroup>
               <FormControl type="text" placeholder="Text" />
             </FormGroup>
             {' '}
             <Button type="submit">Search</Button>
           </Navbar.Form>
           <Navbar.Form>
             <FormGroup>
               Results per page:
               {' '}
               <FormControl componentClass="select" placeholder="40">
                 <option value="40">40</option>
                 <option value="other">...</option>
               </FormControl>
             </FormGroup>
           </Navbar.Form>
         </Navbar>
       </div>
    );
  }
}

class LQTable extends Component {
  render() {
    return (
      <div className="LQTable">
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
              <th>Distractors</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>What's 2 + 2?</td>
              <td>4</td>
              <td>3, 5</td>
              <td>Edit Delete</td>
            </tr>
            <tr>
              <td>What's 3 + 2?</td>
              <td>5</td>
              <td>3, 4, 6</td>
              <td>Edit Delete</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

class LQLinks extends Component {
  render() {
    return (
      <div className="LQLinks">
        <ButtonToolbar>   {/* TODO: Remove if unnecessary */}
          <ButtonGroup>
            <Button disabled={true}>Page:</Button>
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
            <Button>4</Button>
            <Button>5</Button>
            <Button>6</Button>
            <Button>7</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    );
  }
}

export default ListQuestions;
