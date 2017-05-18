import restful, { fetchBackend } from 'restful.js';

const productionRestUrl = "https://joel_qs_api.herokuapp.com/apiv1";
const localhostRestUrl = "http://localhost:8000/questions/";


class AllQuestions {

  constructor() {
    this.api = restful(localhostRestUrl, fetchBackend(fetch));
    this.restUrl = localhostRestUrl;
    this.questions = null;
    this._createFakeQuestions(5);
  }

  _createFakeQuestions(num) {
    this.questions = [];
    for (let i = 0; i < num; i++) {
      const q = {
        id: i,
        question: `What's ${i} + ${i}?`,
        answer: `${i + i}`,
        distractors: `${i + i - 1}, ${i + i + 1}`,
      }
      this.questions.push(q);
    }
  }

  /**
   * Get the list of questions from the REST API or return the cached list.
   */
  getQuestions() {
    if (this.questions === null) {
      throw new Error("REST API call not implemented");
    }
    return this.questions;
  }

  /**
   * Add a question remotely and locally to the end of the list.
   * Return the ID of the new question.
   */
  addQuestion(q) {
    this._assertValidQuestion(q, false);
    this._ajaxAddQuestion(q);
    const newID = this.questions.length;
    q.id = newID;
    this.questions.push(q);
    return newID;
  }

  _ajaxAddQuestion(q) {
    this.api.post(q);
  }

  _assertValidQuestion(q, expectID) {
    if (expectID) {
      console.assert(typeof q.id === 'number');
    } else {
      console.assert(q.id === undefined);
    }

    console.assert(typeof q.question === 'string');
    console.assert(typeof q.answer === 'string');
    console.assert(typeof q.distractors === 'string');
  }
}

window.allQuestions = new AllQuestions();
