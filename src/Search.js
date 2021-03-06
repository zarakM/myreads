import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import SingleBook from "./SingleBook";

class Search extends Component {
  state = {
    searchBooks: []
  };

  updateQuery = query => {
    //this line has been changed to check if there is no character in string then
    //empty then dont search for results
    query === ""
      ? this.setState({ searchBooks: [] })
      : BooksAPI.search(query, 10)
          .then(books => {
            this.setState({
              searchBooks: books.error ? [] : books
            });
          })
          .catch(error => {
            console.log(error);
          });
  };

  render() {
    const mergedBooks = this.state.searchBooks.map(searchBook => {
      const intersectedBook = this.props.books.find(book => {
        return book.id === searchBook.id;
      });
      searchBook.shelf = intersectedBook ? intersectedBook.shelf : "none";

      return searchBook;
    });

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/RusPosevkin/book-tracking/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {mergedBooks.map(book => (
              <SingleBook
                key={book.id}
                book={book}
                updateShelf={this.props.updateShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
