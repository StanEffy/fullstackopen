import { useQuery } from "@apollo/client";
import { useRef } from "react";
import AuthorEdit from "./AuthorEdit";
import { ALL_AUTHORS } from "../queries";

const Authors = ({ setError, show }) => {
  const name = useRef();
  const born = useRef();

  const result = useQuery(ALL_AUTHORS);
  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result?.data?.allAuthors || [];
  const setName = (e) => {
    name.current.value = e.target.innerText;
  };
  return (
    <div style={{ display: show ? "block" : "none" }}>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th />
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td onClick={(e) => setName(e)} style={{ cursor: "pointer" }}>
                {a.name}
              </td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorEdit name={name} born={born} setError={setError} />
    </div>
  );
};

export default Authors;
