import React from "react";
import { Route } from "react-router-dom";
import * as Books from "./models/Books";
import "./App.css";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";

class App extends React.Component {
  state = {
    myReads: [],
    searchResults: []
  };

  componentDidMount() {
    Books.all().then((myReads) => this.setState({ myReads }));
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" exact render={() => (
          <SearchPage emptySearches={this.emptySearches} search={this.search} updateBookShelf={this.updateBookShelf} books={this.state.searchResults} />
        )} />
        <Route
          path="/"
          exact
          render={() => (
            <HomePage
              updateBookShelf={this.updateBookShelf}
              books={this.state.myReads}
            />
          )}
        />
      </div>
    );
  }

  updateBookShelf = (book, shelf) => {
    if (shelf === "none") {
      this.setState((prevState) => ({
        myReads: prevState.myReads.filter((b) => b.id !== book.id),
      }));
    }

    if (book.shelf !== shelf) {
      Books.setBookShelf(book, shelf).then(() => {
        const { myReads, searchResults } = this.state;
        const myReadsIds = myReads.map((b) => b.id);
        const searchedBooksIds = myReads.map((b) => b.id);
        let updatedReads = [];
        let updatedSearches = [];

        if (
          myReadsIds.includes(book.id) ||
          searchedBooksIds.includes(book.id)
        ) {
             updatedReads = myReads.map((b) => {
              if (b.id === book.id) b.shelf = shelf;// ? { ...b, shelf } : b
              return b;
            }
          );
          updatedSearches = searchResults.map((b) => {
            if (b.id === book.id) // ? { ...b, shelf } : b
              b.shelf = shelf;
            return b;
          });
        } else {
          book.shelf = shelf;
          updatedReads = [...myReads, book];
          updatedSearches = [...searchResults, book];//.unique();
        }

        this.setState({ myReads: updatedReads, searchResults: [...new Set(updatedSearches)] });
      });
    }
  };

  emptySearches = () => this.setState({ searchResults: [] });

  search = (event) => {
    const query = event.target.value;
    if (query !== "") {
      Books.search(query).then((results) => {
        if (!results || results.error)
          return this.setState({ searchResults: [] });

        const books = results.map((resultBook) => {
          this.state.myReads.forEach((book) => {
            if (book.id === resultBook.id) resultBook.shelf = book.shelf;
          });
          return resultBook;
        });

        // finally, setState
        this.setState({ searchResults: books });
      });
    } else {
      this.setState({ searchResults: [] });
    }
  };
}

export default App;
