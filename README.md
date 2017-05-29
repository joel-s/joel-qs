# React-based "Questions" UI

*Provides a front end (browser-based UI) to "joel-qs-api" (REST API).*


## Architecture

The server uses Python and Django, with django-rest-framework for the REST API. The client uses React, React Router, and (React) Bootstrap. The code in ES6/JSX. The build process Babel and Webpack to transpile the source code into a single "bundle.js" suitable for running on older browsers such as IE. To start the development with npm, type `npm start`. When working with the development server, just save changes to any of the JavaScript files and the server will restart the application with the changes.

In terms of architecture, I considered three main options:

1. Keep JavaScript to a minimum and have Python/Django do all the data processing and page rendering.
2. Implement the UI mainly in JavaScript but avoid caching data in the browser. With this approach almost every click would result in the JavaScript UI communicating with the server, and the server would do all the filtering, sorting, and pagination.
3. Implement the UI in JavaScript and cache data in the browser. With this approach, the JavaScript downloads all the question data and can filter, sort, and paginate it without having to communicate with the server.

I went with option 3, which minimizes the frequency of requests to the server and provides the fastest UI response times. There are various trade-offs between options 2 and 3, and in my opinion both are good options; which of the two is best would depend on factors such as how many questions there are, how often the question data changes, and how important it is for users editing the questions to quickly see each other's changes.


## Router URLs:

- **/**: List of questions
- **/create**: Create a question
- **/edit/7**: Edit question 7
- **/delete/7**: Delete question 7


## React Components

- **App**: Overall app (NavBar, routing)
- _The rest of the "views" are in the "views" directory._
- **ListQuestions**: Index with a list of questions (filterable, sortable, paginated)
  - **LQControls**: Control form for ListQuestions
  - **LQTable**: Table of questions
  - **LQLinks**: Links to pages of questions
- **CreateQuestion**: Create a new question
- **EditQuestion**: Edit an existing question
- **QuestionForm**: Form component used by CreateQuestion and EditQuestion
- **DeleteQuestion**: Delete a question (prompt for Delete/Cancel)


## Local and Remote data

To keep things simple, the React app _assumes_ that it is the only client communicating with the back end. If other clients use the back end simultaneously, the app will be blissfully unaware of the changes made by those clients.

To prepare this app for deployment in a production environment, enhancements would need to be made to keep data in sync between multiple app instances and the back end.

Possible ways to keep state:

- Redux (seems like overkill)
- A more informal global object (AllQuestions instantiated as window.allQuestions), which could also take care of communicating with the REST endpoint. It would need at least the following methods:
  - getQuestions()
  - addQuestion()
  - updateQuestion()

How could state get communicated to components? (Keep it simple.)

ListQuestions calls AllQuestions.getQuestions() each time it is instantiated--it clones the list of questions so that it can sort it in any desired order (using setState()). AllQuestions.getQuestions() returns an empty list if it has to give up on communicating with the server. CreateQuestion calls addQuestion(), which returns either success or failure (depending on ability to contact the server). In case of failure, AllQuestions does not modify its internal list of questions. Likewise, EditQuestion calls updateQuestion(), which works the same in the case of failure.


## API Callbacks and Error Handling

If AllQuestions.addQuestion() succeeds, the user should be redirected to the index (question list). If it fails, however, the user should see a dialog box with the error details. Similar handling should apply to other functions that attempt to contact the REST API.

It would be nice to prevent the user from submitting multiple API calls by (for example) double-clicking a "Save" button. This doesn't need to be implemented in the MVP, though.


## Filtering, Sorting, and Paginating Questions

Filtering and sorting should be done first, then pagination.

Filterer, Sorter, and Paginator classes?

State in ListQuestions:

- questions - List of *all* question objects, in order of creation
- searchText - Text entered in the search field
- sortColumn - Which column to sort by (default is the hidden ID column, `id`)
- ascending - Sort order, `true` by default

Need a component for toggling sorting state (None, Ascending, Descending). Let's call it SortToggle.
