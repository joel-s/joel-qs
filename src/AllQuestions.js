import restful, { fetchBackend } from 'restful.js';


class AllQuestions {

  constructor() {
    this.api = restful("http://localhost:8000", fetchBackend(fetch));
    this.questions = null;
    // this._createFakeQuestions(5);
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
   * Get a promise (for a response) from the API or return the cached array.
   * If the response has a numeric 'length' argument, it's an array.
   */
  getQuestions() {
    if (this.questions !== null) {
      return this.questions;
    }
    const promise = this._ajaxGetQuestions();
    promise.then((response) => {
      const status = response.statusCode();
      if (status >= 200 && status < 300) {
        const qEntities = response.body();
        this.questions = [];
        for (let qEntity of qEntities) {
          const { id, question, answer, distractors } = qEntity.data();
          this.questions.push({ id, question, answer, distractors });
        }
      } else {
        throw Error(`Unexpected GET response: ${status}`);
      }
    });
    return promise;
  }

  _ajaxGetQuestions() {
    return this.api.all("questions").getAll();
  }

  /**
   * Return the question object with the given id, or undefined if not found.
   * Search only the cached `questions` array; no API calls.
   */
   getQuestion(id) {
     if (this.questions === null) {
       return undefined;
     }
     for (let i = 0; i < this.questions.length; i++) {
       if (this.questions[i].id === id) {
         return this.questions[i];
       }
     }
     return undefined;
   }

  /**
   * Add a question remotely and locally to the end of the list.
   * Return a promise for the response.
   */
  addQuestion(q) {
    this._assertValidQuestion(q, false);
    const promise = this._ajaxAddQuestion(q);
    promise.then((response) => {
      const status = response.statusCode();
      if (status >= 200 && status < 300) {
        const newID = response.body().id();
        q.id = newID;
        this.questions.push(q);
      } else {
        throw Error(`Unexpected POST response: ${status}`);
      }
    });
    return promise;
  }

  _ajaxAddQuestion(q) {
    return this.api.all("questions/").post(q);  // HACK: restful.js should add /
  }

  /**
   * Update a question remotely and locally to the end of the list.
   * Return a promise for the response.
   */
  updateQuestion(q) {
    this._assertValidQuestion(q, true);
    const promise = this._ajaxUpdateQuestion(q);
    promise.then((response) => {
      const status = response.statusCode();
      if (status >= 200 && status < 300) {
        this._updateQuestionArrayEntry(q);
      } else {
        throw Error(`Unexpected POST response: ${status}`);
      }
    });
    return promise;
  }

  _ajaxUpdateQuestion(q) {
    return this.api.one("questions", q.id).push(q);
  }

  _updateQuestionArrayEntry(question) {
    this.questions = this.questions.map(q =>
      q.id === question.id ? question : q);
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
