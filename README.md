# React-based "Questions" UI

*Provides a front end to "joel-qs-rest".*


## Router URLs:

- **/**: List of questions
- **/create**: Create a question
- **/edit/7**: Edit question 7
- **/view/7**: View question 7


## React Components

- **App**: Overall app (NavBar, routing)
- _The rest of the "views" are in the "views" directory._
- **ListQuestions**: Index with a list of questions (filterable, sortable, paginated)
- **QuestionList**: List component used by ListQuestions
- **QuestionEditor**: Base class for CreateQuestion and EditQuestion (*TODO*)
- **CreateQuestion**: Create a new question
- **EditQuestion**: Edit an existing question
- **QuestionForm**: Form component used by CreateQuestion and EditQuestion
- **ViewQuestion**: View an existing question


## Local and Remote data

To keep things simple, the React app _assumes_ that it is the only client communicating with the back end. If other clients use the back end simultaneously, the app will be blissfully unaware of the changes made by those clients.

To prepare this app for deployment in a production environment, significant enhancements would need to be made to keep data in sync between multiple app instances and the back end.

Possible ways to keep state:

- Redux (seems like overkill)
- A more informal global object (AllQuestions instantiated as window.allQuestions), which could also take care of communicating with the REST endpoint. It would need at least the following methods:
  - getQuestions()
  - addQuestion()
  - updateQuestion()

How could state get communicated to components? (Keep it simple.)

ListQuestions calls AllQuestions.getQuestions() each time it is instantiated--it clones the list of questions so that it can sort it in any desired order (using setState()). AllQuestions.getQuestions() returns an empty list if it has to give up on communicating with the server. CreateQuestion calls addQuestion(), which returns either success or failure (depending on ability to contact the server). In case of failure, AllQuestions does not modify its internal list of questions. Likewise, EditQuestion calls updateQuestion(), which works the same in the case of failure.
