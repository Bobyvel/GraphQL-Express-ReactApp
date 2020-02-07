import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { getAuthgorsQoery } from "./AddBook";

const addAuthorMutation = gql`
  mutation($name: String!, $age: Int!) {
    addAuthor(name: $name, age: $age) {
      name
      id
    }
  }
`;
class AddAuthor extends Component {
  state = {
    name: "",
    age: 0,
    
  };

  handelSubmit = e => {
    e.preventDefault();
    this.props.addAuthorMutation({
      variables: {
        name: this.state.name,
        age: this.state.age
      },
      refetchQueries: [{query: getAuthgorsQoery}]
    });
  };

  render() {
    return (
      <form id="add-author" onSubmit={this.handelSubmit}>
        <h3>Add New Author</h3>
        <div className="field">
          <label>Author name</label>
          <input
            type="text"
            name="name"
            onChange={e => this.setState({ name: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Age</label>
          <input
            type="number"
            name="age"
            onChange={e => this.setState({ age: parseInt(e.target.value) })}
            
          />
        </div>
        
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthgorsQoery, { name: "getAuthgorsQoery" }),
  graphql(addAuthorMutation, { name: "addAuthorMutation" })
)(AddAuthor);
