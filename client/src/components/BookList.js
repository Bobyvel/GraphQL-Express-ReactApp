import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import BookDetails from "./BookDetails";

export const getBooksQuery = gql`
  {
    books {
      id
      name
    }
  }
`;

class BookList extends Component {
  state = {
    selected: null
  };

  selectBookFromAuthor = id => {
    this.setState({ selected: id });
  };

  displayBooks() {
    let data = this.props.data;
    return data.loading ? (
      <li>Books Loading...</li>
    ) : (
      data.books.map(book => (
        <li
          key={book.id}
          onClick={e => {
            this.setState({ selected: book.id });
          }}
        >
          {book.name}
        </li>
      ))
    );
  }
  render() {
    return (
      <div>
        <h1>Reading list</h1>
        <ul id="book-list">{this.displayBooks()}</ul>
        <BookDetails bookId={this.state.selected} select={this.selectBookFromAuthor}/>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
