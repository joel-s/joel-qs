import React, { Component } from 'react';
import { Navbar, Table } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, Button, ButtonToolbar, ButtonGroup }
  from 'react-bootstrap';
import '../AllQuestions';   // for window.allQuestions


class ListQuestions extends Component {
  constructor(props) {
    super(props);

    let qs = window.allQuestions.getQuestions();
    if (typeof qs.length === "number") {
      let questions = qs.map(({ id, question, answer, distractors }) =>
        ({ id, question, answer, distractors }));
      this.state = { questions, sortColumn: 'id', ascending: false };
    } else {
      this.state = { questions: null, sortColumn: 'id', ascending: false };
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
        <LQTable questions={this.state.questions}
          sortColumn={this.state.sortColumn}
          ascending={this.state.ascending}
          updateSorting={this.updateSorting.bind(this)}/>
        <LQLinks />
      </div>
    );
  }

  updateSorting(stateChanges) {
    this.setState(stateChanges);   // not the world's greatest "loose coupling"
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
              <th>Question
                <SortToggle field="question"
                  sortColumn={this.props.sortColumn}
                  ascending={this.props.ascending}
                  onChange={this.props.updateSorting}/>
              </th>
              <th>Answer
                <SortToggle field="answer"
                  sortColumn={this.props.sortColumn}
                  ascending={this.props.ascending}
                  onChange={this.props.updateSorting}/>
              </th>
              <th>Distractors
                <SortToggle field="distractors"
                  sortColumn={this.props.sortColumn}
                  ascending={this.props.ascending}
                  onChange={this.props.updateSorting}/>
              </th>
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

/**
 * Links to other pages of questions (2, 3, 4, etc.).
 */
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

class SortToggle extends Component {
  UP_ARROW = '\u{2b06}';
  DOWN_ARROW = '\u{2b07}';
  DOUBLE_ARROW = '\u{2b0d}';

  constructor(props) {
    super(props);

    this.bToggle = this.toggle.bind(this);
  }

  toggle(e) {
    const selected = this.props.sortColumn === this.props.field;
    const ascending = this.props.ascending;

    e.preventDefault();
    if (selected && ascending) {
      // Ascending => Unselected
      this.props.onChange({ sortColumn: 'id'});
      // this.setState({ selected: false });
    } else if (selected) {
      // Descending => Ascending
      this.props.onChange({ sortColumn: this.props.field, ascending: true });
      // this.setState({ ascending: true });
    } else {
      // Unselected => Descending
      this.props.onChange({ sortColumn: this.props.field, ascending: false });
      // this.setState({ selected: true, ascending: false });
    }
  }

  render() {
    const selected = this.props.sortColumn === this.props.field;
    return (
      <a href="" onClick={this.bToggle}>
        {selected ?
          (this.props.ascending ? this.UP_ARROW : this.DOWN_ARROW) :
          this.DOUBLE_ARROW}
      </a>
    )
  }
}

export default ListQuestions;
