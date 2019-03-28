import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./ChangeWorkspacename.css";
import axios from "axios";
const Joi = require("joi");

class ChangeWorkspacename extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statusMessage: "",
      newName: "",
      isError: undefined,
      errorMessage: "",
      id: props.match.params.id
    };
  }

  componentDidMount() {
    console.log("This is our id " + this.props.match.params.id);
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
      headers: { "Content-Type": "application/json" },
      url:
        "http://10.0.67.127:8080/api/workspaces" +
        "/EditWorkspaceName/" +
        this.state.id,
      data: {
        id: this.state.id,
        WorkspaceName: this.state.newName
      }
    })
      .then(response => {
        //  this.props.setWorkspaceName,
        this.setState({
          statusMessage: "Workspace name changed!"
        });

        console.log(response);
      })
      .catch(error => {
        this.setState({
          statusMessage: "ERROR!"
        });
      });
  }

  handleChange(event) {
    this.setState({ newName: event.target.value });
  }

  handleSubmit(event) {
    const { error, value } = Joi.validate(
      { WorkspaceName: this.state.newName },
      this.schema
    );
    console.log(Joi.string());
    console.log(value);

    if (error == null) {
      //this.props.setWorkspaceName(this.state.newName);
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
      console.log(message);
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
        {!this.state.isError && this.state.isError != null ? (
          <h3>"Name changed Successfully!"</h3>
        ) : (
          <h3>{this.state.errorMessage}</h3>
        )}
      </div>
    );
  }
}

export default ChangeWorkspacename;
