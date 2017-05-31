import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { FormGroup, Button, Radio, HelpBlock, FormControl, ControlLabel }
  from 'react-bootstrap';
import '../AllQuestions';   // for window.allQuestions

/**
 * Upload a CSV file (optionally overwrite existing questions).
 */
class UploadQuestions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: null,
      overwrite: "append",
      redirectTo: null,
    }
  }

  render() {
    if (this.state.redirectTo !== null) {
      return <Redirect to={this.state.redirectTo} push />
    }
    return (
      <div className="UploadQuestions jumbotron">
        <div className="row">
          <div className="col-sm-offset-2 col-sm-8">
            <h2 className="text-center">Upload questions<br />&nbsp;</h2>

            <form className="form-horizontal"
              onSubmit={this.doUpload.bind(this)}>

              <FormGroup className="text-center">
                <Radio name="overwrite" value="append" inline defaultChecked
                  onChange={this.handleOverwriteChange.bind(this)}>
                  Keep existing data
                </Radio>
                {' '}
                <Radio name="overwrite" value="overwrite" inline
                  style={{ color: 'red' }}
                  onChange={this.handleOverwriteChange.bind(this)}>
                  Replace existing data
                </Radio>
              </FormGroup>

              <FormGroup className="text-center">
                <ControlLabel>CSV File</ControlLabel>
                <FormControl id="fileInput" type="file" name="csvFile"
                  onChange={this.handleFileChange.bind(this)}/>
                <HelpBlock>
                  Each line describes a multiple-choice question.<br />
                  Fields should be separated with "|".
                </HelpBlock>
              </FormGroup>

              <FormGroup className="text-center">
                <Button type="submit" className="btn btn-primary"
                  disabled={this.state.fileName === null}>
                  Upload
                </Button>
                {" "}
                <Button className="btn btn-default"
                  onClick={this.cancelUpload.bind(this)}>
                  Cancel
                </Button>
              </FormGroup>

            </form>
          </div>
        </div>
      </div>
    );
  }

  handleOverwriteChange(event) {
    const target = event.target;
    this.setState({ overwrite: target.value });
  }

  // Important for enabling Save button when a file is selected
  handleFileChange(event) {
    const target = event.target;
    this.setState({ fileName: target.value });
  }

  doUpload(event) {
    event.preventDefault();
    let promise = window.allQuestions.uploadQuestions(this.state.overwrite);
    promise.then(
      response => {
        window._needToReload_ = true;
        this.setState({ redirectTo: "/reload" });
      }
    ).catch(
      error => alert(error)
    );
  }

  cancelUpload(event) {
    event.preventDefault();
    this.setState({ redirectTo: "/" });
  }
}

export default UploadQuestions;
