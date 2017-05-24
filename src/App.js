import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import ListQuestions from './views/ListQuestions';
import CreateQuestion from './views/CreateQuestion';
import EditQuestion from './views/EditQuestion';
import DeleteQuestion from './views/DeleteQuestion';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">Questions</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <LinkContainer to="/create">
                  <NavItem eventKey={1}>Create a question</NavItem>
                </LinkContainer>
                {/*
                <NavItem eventKey={2} href="#">Link</NavItem>
                <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                  <MenuItem eventKey={3.1}>Action</MenuItem>
                  <MenuItem eventKey={3.2}>Another action</MenuItem>
                  <MenuItem eventKey={3.3}>Something else here</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.3}>Separated link</MenuItem>
                </NavDropdown>
                */}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div className="container">
            <Route path="/" exact={true} component={ListQuestions}/>
            <Route path="/create" component={CreateQuestion}/>
            <Route path="/edit/:_id" component={EditQuestion}/>
            <Route path="/delete/:_id" component={DeleteQuestion}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
