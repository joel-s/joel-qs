# Functional tests for "Questions" project

*Tests the entire project: React front-end using Django REST back-end.*

## **In progress**

**I'm architecting the tests in this README; actual tests coming soon.**


## Warning

***The tests modify the list of questions and do not restore it.***

Later, when the Questions app has a "download" feature, restoring the original list of questions can be implemented.


## Configuration

- **setup.py** - Configuration -- most important, the base URL for Selenium


## Tests

- **crud/** - Tests for basic CRUD (Create, Read, Update, Delete) functionality
- **crud/smoke_test.py** - Test a quick create-view-delete
- **crud/creation_test.py** - Tesh


## Utilities and data files

- **data/** - Lists of questions to upload
- **data/0-questions.csv** - No questions
- **data/11-questions.csv** - Eleven questions for basic pagination testing
- **data/4000-questions.csv** - The 4000 questions supplied with the coding challenge
