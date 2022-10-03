import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useApolloClient, useQuery } from "@apollo/client";
import LoginForm from "./components/LoginForm";

import Notify from "./components/Notify";
import { ALL_AUTHORS, ALL_BOOKS } from "./queries";

const App = () => {
  const result = useQuery(ALL_BOOKS);
  const authors = useQuery(ALL_AUTHORS);

  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [page, setPage] = useState("authors");
  const client = useApolloClient();

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
    </div>
  );
};

export default App;
