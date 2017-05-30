import React, { Component } from 'react';
import { Navbar, Table } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, Button, ButtonGroup }
  from 'react-bootstrap';
import '../AllQuestions';   // for window.allQuestions
import { filterQs, sortQs, paginateQs } from '../ProcessQuestions';


class ListQuestions extends Component {
  constructor(props) {
    super(props);

    let questions = null;
    let qs = window.allQuestions.getQuestions();
    if (typeof qs.length === "number") {
      questions = qs.map(({ id, question, answer, distractors }) =>
        ({ id, question, answer, distractors }));
    }

    this.state = {
      questions: questions,
      searchText: null,
      sortColumn: 'id',
      ascending: true,
      perPage: 40,
      pageNum: 1,   // minimum value is 1 (for consistency with UI)
    };

    if (this.state.questions === null) {
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
    let sortedQs = null;
    let thisPageQs = null;

    if (this.state.questions !== null) {
      const filteredQs = filterQs(this.state.questions, this.state.searchText);
      sortedQs = sortQs(filteredQs, this.state.sortColumn,
        this.state.ascending);
      thisPageQs = paginateQs(sortedQs, this.state.perPage,
        this.state.pageNum);
    }

    return (
      <div className="ListQuestions">
        <LQControls doFilter={this.filterBySearchText.bind(this)}
          updatePerPage={this.updatePerPage.bind(this)}/>
        <LQTable questions={thisPageQs}
          sortColumn={this.state.sortColumn}
          ascending={this.state.ascending}
          updateSorting={this.updateSorting.bind(this)}/>
        <LQButtons numQuestions={sortedQs === null ? 0 : sortedQs.length}
          perPage={this.state.perPage}
          pageNum={this.state.pageNum}
          gotoPage={this.gotoPage.bind(this)}/>
      </div>
    );
  }

  filterBySearchText(string) {
    this.setState({ searchText: string });
  }

  updateSorting({ sortColumn, ascending }) {
    this.setState({ sortColumn, ascending });
  }

  updatePerPage(num) {
    this.setState({ perPage: num, pageNum: 1 });
  }

  gotoPage(num) {
    this.setState({ pageNum: num });
  }
}

class LQControls extends Component {
  constructor(props) {
    super(props);

    this.state = { filterText: null };
  }

  render() {
    return (
      <div className="LQControls">
        <Navbar>
           <Navbar.Form pullLeft>
             <FormGroup>
               <FormControl type="text" placeholder="Text"
                 onChange={this.onTextChange.bind(this)}/>
             </FormGroup>
             {' '}
             <Button type="submit" onClick={this.onFilterClick.bind(this)}>
               Search
             </Button>
           </Navbar.Form>
           <Navbar.Form>
             <FormGroup>
               Results per page:
               {' '}
               <FormControl componentClass="select" defaultValue="40"
                 onChange={this.onPerPageSelect.bind(this)}>
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

  onTextChange(event) {
    this.setState({ filterText: event.target.value });
  }

  onFilterClick(event) {
    event.preventDefault();
    this.props.doFilter(this.state.filterText);
  }

  onPerPageSelect(event) {
    let newValue;
    if (event.target.value === "all") {
      newValue = null;
    } else {
      newValue = +event.target.value;   // convert to number
    }
    this.props.updatePerPage(newValue);
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
class LQButtons extends Component {

  render() {
    if (this.props.perPage === null ||
        this.props.numQuestions < this.props.perPage ) {
      return <div className="LQButtons"></div>;
    }

    const numPages = Math.ceil(this.props.numQuestions / this.props.perPage);
    const pages = [...Array(numPages).keys()].map(x => x+1);

    return (
      <div className="LQButtons">
        <ButtonGroup>
          <Button className='display-only'><strong>Page:</strong></Button>
          {
            pages.map(p =>
              <Button key={p} onClick={this.gotoPage.bind(this, p)}
                active={p === this.props.pageNum}>
                {p}
              </Button>
            )
          }
        </ButtonGroup>
      </div>
    );
  }

  gotoPage(pageNum) {
    this.props.gotoPage(pageNum);
  }
}

/**
 * Input component that controls what field and order is used for sorting.
 */
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
    if (selected && !ascending) {
      // Descending => Unselected
      this.props.onChange({ sortColumn: 'id', ascending: true });
    } else if (selected) {
      // Ascending => Descending
      this.props.onChange({ sortColumn: this.props.field, ascending: false });
    } else {
      // Unselected => Ascending
      this.props.onChange({ sortColumn: this.props.field, ascending: true });
    }
  }

  render() {
    const selected = this.props.sortColumn === this.props.field;
    return (
      <a href="" onClick={this.bToggle}>
        {selected ?
          (this.props.ascending ? this.DOWN_ARROW : this.UP_ARROW) :
          this.DOUBLE_ARROW}
      </a>
    )
  }
}

export default ListQuestions;
