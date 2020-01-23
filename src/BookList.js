import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SeprateShelves from './SeprateShelves';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class BookList extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <SeprateShelves
              type={this.props.shelves[0]}
              books={this.props.books}
              filteredBooksIDs={this.props.shelf_data[this.props.shelves[0]]}
              updateShelf={this.props.updateShelf}
            />
            <SeprateShelves
              type={this.props.shelves[1]}
              books={this.props.books}
              filteredBooksIDs={this.props.shelf_data[this.props.shelves[1]]}
              updateShelf={this.props.updateShelf}
            />
            <SeprateShelves
              type={this.props.shelves[2]}
              books={this.props.books}
              filteredBooksIDs={this.props.shelf_data[this.props.shelves[2]]}
              updateShelf={this.props.updateShelf}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'><FontAwesomeIcon icon={faSearch} size={"4x"}/></Link>
        </div>
      </div>
    );
  }
};

export default BookList
