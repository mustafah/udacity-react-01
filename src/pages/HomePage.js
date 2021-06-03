import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookShelf from "./components/BookShelf";

class HomePage extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf
            updateBookShelf={this.props.updateBookShelf}
            shelfTitle="Currently Reading"
            books={this.props.books.filter(
              (book) => book.shelf === "currentlyReading"
            )}
          />
          ,
          <BookShelf
            updateBookShelf={this.props.updateBookShelf}
            shelfTitle="Want to Read"
            books={this.props.books.filter(
              (book) => book.shelf === "wantToRead"
            )}
          />
          ,
          <BookShelf
            updateBookShelf={this.props.updateBookShelf}
            shelfTitle="Read"
            books={this.props.books.filter((book) => book.shelf === "read")}
          />
        </div>

        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default HomePage;
