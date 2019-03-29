import React, { Component } from "react";
import "./OmniSearch.css";
import { Button } from "reactstrap";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import axios from "axios";
import auth from "../../Services/authService";

export default class OmniSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workspaceId: this.props.workspaceId,
            searchQuery: ""
        };
    }

    componentDidMount() {
        auth.login("ziadalikhalifa@gmail.com", "Password");
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    handleSearch() {
        axios(
            auth.includeAuth({
                method: "get",
                url: "http://10.0.67.127:8080/api/workspaces/OmniSearch",
                responseType: "json",
                data: {
                    workspaceId: this.state.workspaceId,
                    searchQuery: this.state.searchQuery
                }
            })
        ).then(function(response) {
            console.log(response.data);
        });
    }

    render() {
        return (
            <React.Fragment>
                <InputGroup className="mb-3">
                    <FormControl
                        name="searchQuery"
                        placeholder="Search for anything!"
                        aria-label="search"
                        className="search-bar"
                        aria-describedby="basic-addon2"
                        onChange={this.handleChange.bind(this)}
                    />
                    <InputGroup.Append>
                        <Button
                            variant="outline-secondary"
                            className="search-btn"
                            onClick={this.handleSearch.bind(this)}
                        >
                            Search
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </React.Fragment>
        );
    }
}
