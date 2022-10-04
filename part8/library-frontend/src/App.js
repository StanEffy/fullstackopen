import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import LoginForm from "./components/LoginForm";

import Notify from "./components/Notify";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from "./queries";
import RecommendGenre from "./components/RecommendGenre";

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    };
  });
};

const App = () => {
  const result = useQuery(ALL_BOOKS);
  const authors = useQuery(ALL_AUTHORS);

  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [page, setPage] = useState("authors");
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData, client }) => {
      const bookAdded = subscriptionData.data.bookAdded;

      notify(`${bookAdded.title} added`);
      updateCache(client.cache, { query: ALL_BOOKS }, bookAdded);
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  useEffect(() => {
    logout();
  }, []);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  if (!token) {
    return (
      <>
        <Notify errorMessage={errorMessage} />
        <LoginForm setToken={setToken} setError={notify} />
      </>
    );
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommended")}>recommended</button>
      </div>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Authors
        show={page === "authors"}
        authors={authors.data.allAuthors}
        setError={notify}
      />
      <Books show={page === "books"} books={result.data.allBooks} />
      <NewBook show={page === "add"} setError={notify} />
      <RecommendGenre
        show={page === "recommended"}
        books={result.data.allBooks}
      />
    </div>
  );
};

export default App;
