import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Redirect } from 'react-router-dom'
import axios from "axios";

class SetDefaultWorkspaceHours extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statusMessage: "",
      DoNotDisturbFrom: -1,
      DoNotDisturbTo: -1,
      isSet: undefined,
      id: props.match.params.id
    };
  }


  putData() {
    axios({
      method: "put",
      headers: {
        "Content-Type": "application/json",
        'Authorization': "bearer " + localStorage.getItem('token')
      },
      url:
        "http://10.0.67.127:8080/api/workspaces" +
        "/WorkspaceDoNotDisturbPeriod/" + this.state.id,
      data: {
        DoNotDisturbFrom: this.state.DoNotDisturbFrom,
        DoNotDisturbTo: this.state.DoNotDisturbTo
      }
    }).then(response => {
      this.setState({
        statusMessage: "Default Hours set successfully!",
        isDone: true
      });
    });
  }


  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    this.setState({
      isSet: true,
      statusMessage: "Default Hours set successfully!"
    });
    this.putData();
    event.preventDefault();
  }

  render() {
    return (
      <div id="form">
        <Form>
          <FormGroup>
            <Label for="DoNotDisturbFrom">Select start Time</Label>
            <Input
              type="select"
              name="select"
              id="DoNotDisturbFrom"
              onChange={this.handleChange.bind(this)}
            >
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
              <option>13</option>
              <option>14</option>
              <option>15</option>
              <option>16</option>
              <option>17</option>
              <option>18</option>
              <option>19</option>
              <option>20</option>
              <option>21</option>
              <option>22</option>
              <option>23</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="DoNotDisturbTo">Select End Time</Label>
            <Input
              type="select"
              name="select"
              id="DoNotDisturbTo"
              onChange={this.handleChange.bind(this)}
            >
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
              <option>13</option>
              <option>14</option>
              <option>15</option>
              <option>16</option>
              <option>17</option>
              <option>18</option>
              <option>19</option>
              <option>20</option>
              <option>21</option>
              <option>22</option>
              <option>23</option>
            </Input>
          </FormGroup>
          <Button
            id="submit"
            value="submit"
            onClick={this.handleSubmit.bind(this)}
          >
            Submit
          </Button>
        </Form>
        {this.state.isSet === true && this.state.statusMessage != null ? (
          <h3>"Default Hours set successfully!"</h3>
        ) : (<></>)}

        {this.state.isDone ? (<Redirect
          to={{ pathname: `/workspace/${this.props.CurrentWorkspace.Id}`, CurrentWorkspace: this.props.CurrentWorkspace }} />
        ) : (<></>)}

      </div>
    );
  }
}

export default SetDefaultWorkspaceHours;
