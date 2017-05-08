import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import { Grid, Navbar, Nav, NavItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import ListQuestions from './views/ListQuestions';
import CreateQuestion from './views/CreateQuestion';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar inverse fixedTop>
            <Grid>
              <Navbar.Header>
                <Navbar.Brand>
                  <Link to="/">Questions</Link>
                </Navbar.Brand>
                <Nav>
                  <LinkContainer to="/create">
                    <NavItem eventKey={1}>Create a Question</NavItem>
                  </LinkContainer>
                </Nav>
                <Navbar.Toggle />
              </Navbar.Header>
            </Grid>
          </Navbar>

          <div class="container">
              <div id="banner" class="page-header">
                &nbsp;
              </div>

            // Main "routing table"
            <Route path="/" exact={true} component={ListQuestions}/>
            <Route path="/create" exact={true} component={CreateQuestion}/>

          </div>
        </div>
      </Router>
    );
  }
}

export default App;
