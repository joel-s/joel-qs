import axios from 'axios';

class AllQuestions {

  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:8000/',
      timeout: 5000,
    });
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
   * Return a promise (for a response) from the API or a cached array.
   * If the response has a numeric 'length' argument, it's an array.
   */
  getQuestions() {
    if (this.questions !== null) {
      return this.questions;
    }
    const promise = this._ajaxGetQuestions();
    promise.then((response) => {
      const status = response.status;
      if (status >= 200 && status < 300) {
        const qEntities = response.data;
        this.questions = [];
        for (let qEntity of qEntities) {
          const { id, question, answer, distractors } = qEntity;
          this.questions.push({ id, question, answer, distractors });
        }
      } else {
        throw Error(`Unexpected GET response: ${status}`);
      }
    });
    return promise;
  }

  _ajaxGetQuestions() {
    // return this.api.all("questions").getAll();
    return this.api.get("questions/");
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
      console.log(response);
      const status = response.status;
      if (status >= 200 && status < 300) {
        const newID = response.data.id;
        q.id = newID;
        this.questions.push(q);
      } else {
        throw Error(`Unexpected POST response: ${status}`);
      }
    });
    return promise;
  }

  _ajaxAddQuestion(q) {
    return this.api.post("questions/", q);
  }

  /**
   * Update a question remotely and locally to the end of the list.
   * Return a promise for the response.
   */
  updateQuestion(id, q) {
    this._assertValidQuestion(q, false);
    const promise = this._ajaxUpdateQuestion(id, q);
    promise.then((response) => {
      const status = response.status;
      if (status >= 200 && status < 300) {
        q.id = id;
        this._localUpdateQuestion(q);
      } else {
        throw Error(`Unexpected PUT response: ${status}`);
      }
    });
    return promise;
  }

  _ajaxUpdateQuestion(id, q) {
    return this.api.put("questions/" + id + "/", q);
  }

  _localUpdateQuestion(question) {
    for (let i = 0; i < this.questions.length; i++) {
      if (this.questions[i].id === question.id) {
        this.questions[i] = question;
        return;
      }
    }
  }

  /**
   * Delete a question remotely and locally.
   * Return a promise for the response.
   */
  deleteQuestion(id) {
    const promise = this._ajaxDeleteQuestion(id);
    promise.then((response) => {
      const status = response.status;
      if (status >= 200 && status < 300) {
        this._localDeleteQuestion(id);
      } else {
        throw Error(`Unexpected DELETE response: ${status}`);
      }
    });
    return promise;
  }

  _ajaxDeleteQuestion(id, q) {
    return this.api.delete("questions/" + id + "/");
  }

  _localDeleteQuestion(id) {
    for (let i = 0; i < this.questions.length; i++) {
      if (this.questions[i].id === id) {
        this.questions.splice(i, 1);
        return;
      }
    }
  }

  /**
   * Upload a CSV file containing questions.
   * Return a promise for the response.
   */
  uploadQuestions(overwrite) {
    const promise = this._ajaxUploadQuestions(overwrite);
    promise.then((response) => {
      const status = response.status;
      if (status >= 200 && status < 300) {
        this._localUploadQuestions();
      } else {
        throw Error(`Unexpected POST response: ${status}`);
      }
    });
    return promise;
  }

  _ajaxUploadQuestions(overwrite) {
    let formData = new FormData();

    // Tight coupling to UI. There might be a more "React" way to do this.
    let fileSelector = document.querySelector('#fileInput');
    formData.append("csvFile", fileSelector.files[0]);

    console.assert(overwrite === "append" || overwrite === "overwrite");
    formData.append("overwrite", overwrite);

    return this.api.post("questions-csv/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    });
  }

  _localUploadQuestions() {
    // TODO: Anything needed here?
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
