# React-based "Questions" UI

*Provides a front end to "joel-qs-rest".*


## Router URLs:

- **/**: List of questions
- **/create**: Create a question
- **/edit/7**: Edit question 7
- **/view/7**: View question 7


## Top-level Components

- **App**: Overall app (routing)
- _The rest of the "views" are in the "views" directory._
- **ListQuestions**: List of questions (filterable, sortable, paginated)
- **QuestionEditor**: Base class for CreateQuestion and EditQuestion (*TODO*)
- **CreateQuestion**: Create a new question
- **EditQuestion**: Edit an existing question
- **QuestionForm**: Form component used by CreateQuestion and EditQuestion
- **ViewQuestion**: View an existing question


## Local and Remote data

To keep things simple, the React app _assumes_ that it is the only client communicating with the back end. If other clients use the back end simultaneously, the app will be blissfully unaware of the changes made by those clients.

To prepare this app for deployment in a production environment, significant enhancements would need to be made to keep data in sync between multiple app instances and the back end.
