import { useLazyQuery, useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useEffect, useState } from "react";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);

  const [booksByGenre, booksByGenreResult] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: "no-cache",
  });
  const [filter, setFilter] = useState("all");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    if (booksByGenreResult.data) {
      setBooks(booksByGenreResult.data.allBooks);
    }
  }, [booksByGenreResult.data]);
  const { allBooks } = result.data;
  const genres = ["all", ...new Set(allBooks.map((b) => b.genres).flat())];

  useEffect(() => {
    let booksFiltered = allBooks.filter((b) =>
      filter === "all" ? b : b.genres.includes(filter)
    );
    setBooks(booksFiltered);
  }, [allBooks, filter]);

  if (allBooks.loading) {
    return <div>loading...</div>;
  }
  const handleFilter = (filter) => {
    setFilter(filter);
    if (filter === "all") {
      setBooks(allBooks);
    } else {
      booksByGenre({ variables: { genre: filter } });
    }
  };
  return (
    <div style={{ display: props.show ? "block" : "none" }}>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button key={g} onClick={() => handleFilter(g)}>
          {g}
        </button>
      ))}
    </div>
  );
};

export default Books;
