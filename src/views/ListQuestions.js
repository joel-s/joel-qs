import React, { Component } from 'react';
import { Navbar, Table } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
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
        <LQTable questions={this.state.questions}/>
        <LQLinks />
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
               <FormControl componentClass="select" defaultValue="40">
                 <option value="10">10</option>
                 <option value="20">20</option>
                 <option value="40">40</option>
                 <option value="80">80</option>
                 <option value="all">All</option>
               </FormControl>
             </FormGroup>
           </Navbar.Form>
         </Navbar>
       </div>
    );
  }
}

class LQTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectTo: null,
    }
  }

  handleRowClick(id, e) {
    this.setState({ redirectTo: 'edit/' + id });
  }

  render() {
    if (this.state.redirectTo !== null) {
      return <Redirect to={this.state.redirectTo} push />
    }
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
            {
              this.props.questions === null ?
              <tr key={-1}>
                <td colSpan={4}><em>Loading...</em></td>
              </tr> :
              this.props.questions.map(q =>
                <tr key={q.id} onClick={this.handleRowClick.bind(this, q.id)}
                  style={{ cursor: "pointer" }}>
                  <td>{q.question}</td>
                  <td>{q.answer}</td>
                  <td>{q.distractors}</td>
                  <td><Link to={"/delete/" + q.id}>Delete</Link></td>
                </tr>
              )
            }
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
          <ButtonGroup className='display-only'>
            <Button>Page:</Button>
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
