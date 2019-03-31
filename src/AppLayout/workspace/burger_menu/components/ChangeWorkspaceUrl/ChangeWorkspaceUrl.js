import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Redirect } from 'react-router-dom';
import axios from "axios";
const Joi = require("joi");

class ChangeWorkspaceUrl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statusMessage: "",
      newURL: "",
      isError: undefined,
      errorMessage: "",
      id: props.match.params.id,
      isDone: false
    };
  }


  schema = {
    URL: Joi.string().uri()
  };

  putData() {
    axios({
      method: "put",
      headers: {
        "Content-Type": "application/json",
        'Authorization': "bearer " + localStorage.getItem('token')
      },
      url: "http://10.0.67.127:8080/api/workspaces" + "/EditWorkspaceURL/" + this.state.id,
      data: {
        WorkspaceName: this.props.CurrentWorkspace.WorkspaceName,
        URL: this.state.newURL
      }
    })
      .then(() => {
        this.setState({
          statusMessage: "Workspace URL changed!",
          isDone: true
        });

      })
      .catch(() => {
        this.setState({
          isError: true,
          statusMessage: "ERROR!"
        });
      });
  }

  handleChange(event) {

    this.setState({ newURL: event.target.value });
  }

  handleSubmit(event) {
    const { error } = Joi.validate(
      { URL: this.state.newURL },
      this.schema
    );

    if (error == null) {
      this.setState({
        isError: false
      });
      this.putData();
    } else {
      const message = error.details[0].message;
      this.setState({
        errorMessage: message,
        isError: true
      });
    }
    event.preventDefault();
  }

  render() {
    return (
      <div id="form">
        <Form>
          <FormGroup>
            <Label for="workspaceURL">Workspace URL</Label>
            <Input
              type="url"
              name="URL"
              id="workspaceURL"
              placeholder="https://www.zew.com"
              value={this.state.newURL}
              onChange={this.handleChange.bind(this)}
            />
          </FormGroup>
          <Button
            id="submit"
            value="submit"
            onClick={this.handleSubmit.bind(this)}
          >
            Submit
          </Button>
        </Form>
        {!this.state.isError && this.state.isError != null ? (
          <h3>"URL changed Successfully!"</h3>
        ) : (
            <h3>{this.state.errorMessage}</h3>
          )}

        {this.state.isDone ? (<Redirect
          to={{ pathname: `/workspace/${this.props.CurrentWorkspace.Id}`, CurrentWorkspace: this.props.CurrentWorkspace }} />
        ) : (<></>)}
      </div>
    );
  }
}

export default ChangeWorkspaceUrl;
