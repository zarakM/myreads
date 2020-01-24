import React, { Component } from "react";
import PropTypes from "prop-types";

class SingleBook extends Component {
  render() {
    const book = this.props.book;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            {book.imageLinks && book.imageLinks.thumbnail ? (
              <img alt="Books cover" className="book-cover" src={book.imageLinks.thumbnail}></img>
            ) : null}
            <div className="book-shelf-changer">
              <select
                value={book.shelf}
                onChange={event =>
                  this.props.updateShelf(book, event.target.value)
                }
              >
                {/* value changed so its not make confusion on none values */}
                <option value="moveTo" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
            {book.authors
              ? book.authors.map(author => <p key={author}>{author}</p>)
              : null}
          </div>
        </div>
      </li>
    );
  }
  static propTypes = {
    book: PropTypes.object.isRequired
  };
}

export default SingleBook;
