# React-based "Questions" UI

*Provides a front end to "joel-qs-rest".*


## Router URLs:

- /: List of questions
- /create: Create a question
- /edit/7: Edit question 7
- /view/7: View question 7


## Top-level Components

- **App**: Overall app (routing)
- _The rest of the "views" are in the "views" directory._
- **ListQuestions**: List of questions (filterable, sortable, paginated)
- **QuestionEditor**: Base class for CreateQuestion, EditQuestion
- **CreateQuestion**: Create a new question
- **EditQuestion**: Edit an existing question
- **ViewQuestion**: View an existing question
