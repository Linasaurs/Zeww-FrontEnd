import React, { Component } from "react";
import "./OmniSearch.css";
import axios from "axios";
import auth from "../../Services/authService";
import config from '../../config'

export default class OmniSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workspaceId: this.props.workspaceId,
            searchQuery: "",
            returnedChannels: [],
            returnedUsers: []
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
        var workspaceIdToSearchIn = this.state.workspaceId;
        var searchQueryToSearchWith = this.state.searchQuery;
        var self = this;
        axios(
            auth.includeAuth({
                method: "get",
                url: `${config.BASE_URL}/workspaces/omnisearch?searchQuery=${searchQueryToSearchWith}&workspaceId=${workspaceIdToSearchIn}`,
                responseType: "json"
                // data: {
                //     searchQuery: searchQueryToSearchWith
                //     workspaceId: workspaceIdToSearchIn
                // }
            })
        ).then(function(response) {
            console.log(response.data);
            self.setState({
                returnedChannels: response.data.returnedChannels,
                returnedUsers: response.data.returnedUsers
            });
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="input-group input-groups">
                    <input
                        name="searchQuery"
                        placeholder="Search for anything!"
                        aria-label="search"
                        aria-describedby="basic-addon2"
                        onChange={this.handleChange.bind(this)}
                        className="form-control search-form"
                    />
                    <span className="input-group-btn">
                        <button
                            type="submit"
                            className="btn search-btn"
                            data-target="#search-form"
                            name="search-button"
                            onClick={this.handleSearch.bind(this)}
                        >
                            <i className="fa fa-search" />
                        </button>
                    </span>
                </div>
                <section className="section">
                    <ul className="search-results">
                        {this.state.returnedUsers.map(item => (
                            <li className="classTemp" key={item.id}>{item.name}</li>
                        ))}
                    </ul>
                    {this.state.returnedChannels && (
                        <ul className="search-results">
                            {this.state.returnedChannels.map(item => (
                                <li className="classTemp" key={item.id}>{item.name}</li>
                            ))}
                        </ul>
                    )}
                </section>
            </React.Fragment>
        );
    }
}
