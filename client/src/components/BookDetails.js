import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getBookQuery = gql`
  query($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

class BookDetails extends Component {
  displayBook() {
    const { book } = this.props.data;
    return book ? (
      <div>
        <h2>Title: {book.name}</h2>
        <p>Genre: {book.genre}</p>
        <p>Author: {book.author.name}</p>
        <p>All books by this author:</p>
        {book.author.books.length !== 1 ? (
          <ul className="other-books">
            {book.author.books
              .filter(b => b.id !== book.id)
              .map(b => (
                <li
                  className="selected"
                  key={b.id}
                  onClick={e => {
                    this.props.select(b.id);
                  }}
                >
                  {b.name}
                </li>
              ))}
          </ul>
        ) : (
          <p>No other books</p>
        )}
      </div>
    ) : (
      <p>No book selected...</p>
    );
  }
  render() {
    return (
      <div id="book-details">
        <h2>Book Details</h2>
        {this.displayBook()}
      </div>
    );
  }
}

export default graphql(getBookQuery, {
  options: props => {
    return {
      variables: {
        id: props.bookId
      }
    };
  }
})(BookDetails);
