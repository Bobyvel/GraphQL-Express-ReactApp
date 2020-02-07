import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { getBooksQuery } from "./BookList";

export const getAuthgorsQoery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;
class AddBook extends Component {
  state = {
    name: "",
    genre: "",
    authorId: ""
  };
  loadAuthors() {
    let data = this.props.getAuthgorsQoery;
    return data.loading ? (
      <option>Loading authors...</option>
    ) : (
      data.authors.map(author => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ))
    );
  }

  handelSubmit = e => {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{query: getBooksQuery}]
    });
  };

  render() {
    return (
      <form id="add-book" onSubmit={this.handelSubmit}>
      <h3>Add New Book</h3>
        <div className="field">
          <label>Book name</label>
          <input
            type="text"
            name="name"
            onChange={e => this.setState({ name: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Genre</label>
          <input
            type="text"
            name="genre"
            onChange={e => this.setState({ genre: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Authors</label>
          <select onChange={e => this.setState({ authorId: e.target.value })}>
            <option>Select author</option>
            {this.loadAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthgorsQoery, { name: "getAuthgorsQoery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
