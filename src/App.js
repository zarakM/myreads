import React from "react";
import { Switch, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Search from "./Search";
import BookList from "./BookList";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: ["currentlyReading", "wantToRead", "read"], //shelves_type
    shelf_data: {}                                        //shelves
  };

  componentDidMount() {
    this.getData()
  }

  getData=()=>{
    BooksAPI.getAll().then(books => {
      const shelf_data = this.state.shelves.reduce((data, state) => {
        data[state] = books
          .filter(book => book.shelf === state)
          .map(book => book.id);
        console.log(data);
        return data;
      }, {});
      this.setState({ books, shelf_data });
    });
  }
  
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(shelf_data => {
      book.shelf = shelf;
      this.setState({ shelf_data });
    });
  };

  updateShelf_r = (book, shelf) => {
    BooksAPI.update(book, shelf).then(shelves => {
      book.shelf = shelf;
      this.getData();
    });
  };

  render() {
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <BookList
                updateShelf={this.updateShelf}
                books={this.state.books}
                shelf_data={this.state.shelf_data}
                shelves={this.state.shelves}
              />
            )}
          />
          <Route
            exact
            path="/search"
            render={() => (
              <Search
                updateShelf={this.updateShelf_r}
                books={this.state.books}
                shelves={this.state.shelves}
                shelfTypes={this.state.shelfTypes}
                as
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
