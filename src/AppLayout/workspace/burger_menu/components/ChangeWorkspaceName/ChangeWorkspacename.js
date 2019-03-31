import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Redirect } from 'react-router-dom'
import "./ChangeWorkspacename.css";
import axios from "axios";
import withAuthentication from "../../../../../HOC/withAuthentication";
const Joi = require("joi");

class ChangeWorkspacename extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statusMessage: "",
      newName: "",
      isError: undefined,
      errorMessage: "",
      id: props.match.params.id,
      isDone: false
    };
  }

  schema = {
    WorkspaceName: Joi.string()
      .min(3)
      .max(30)
      .required()
  };

  putData() {
    axios({
      method: "put",
      headers: {
        "Content-Type": "application/json",
        'Authorization': "bearer " + localStorage.getItem('token')
      },
      url:
        "http://10.0.67.127:8080/api/workspaces" +
        "/EditWorkspaceName/" +
        this.state.id,
      data: {
        WorkspaceName: this.state.newName
      }
    }).then(() => {

      this.setState({
        statusMessage: "Workspace name changed!",
        isDone: true
      }, console.log("then set"));
    }).catch(() => {
      this.setState({
        statusMessage: "ERROR!"
      });
    });
  }

  handleChange(event) {
    this.setState({ newName: event.target.value });
  }

  handleSubmit(event) {

    const { error } = Joi.validate(
      { WorkspaceName: this.state.newName },
      this.schema
    );

    if (error == null) {
      this.setState({
        isError: false
      }, this.putData());
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
            <Label for="workspaceName">Workspace Name</Label>
            <Input
              type="text"
              name="Name"
              id="WorkspaceName"
              placeholder="New Workspace Name"
              value={this.state.newName}
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
        {!this.state.isError && this.state.isError != null ?
          (<>
            <h3>"Name changed Successfully!"</h3>
          </>)
          :
          (<h3>{this.state.errorMessage}</h3>)}

        {this.state.isDone ? (<Redirect
          to={{ pathname: `/workspace/${this.props.CurrentWorkspace.Id}`, CurrentWorkspace: this.props.CurrentWorkspace }} />
        ) : (<></>)}
      </div>
    );
  }
}

export default withAuthentication(ChangeWorkspacename);
