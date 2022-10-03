import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useEffect, useState } from "react";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [filter, setFilter] = useState("all");
  const [booksF, setBooksF] = useState(result?.data?.allBooks);

  const books = result?.data?.allBooks || [];
  const genres = [...new Set(books.map((b) => b.genres).flat())];

  useEffect(() => {
    let booksFiltered = books.filter((b) =>
      filter === "all" ? b : b.genres.includes(filter)
    );
    setBooksF(booksFiltered);
  }, [filter]);

  if (result.loading) {
    return <div>loading...</div>;
  }
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
          {booksF.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setFilter("all")}>all</button>
      {genres.map((g) => (
        <button key={g} onClick={() => setFilter(g)}>
          {g}
        </button>
      ))}
    </div>
  );
};

export default Books;
