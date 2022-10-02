import { useMutation, useQuery } from "@apollo/client";
import { useRef } from "react";
import AuthorEdit from "./AuthorEdit";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const Authors = (props) => {
  const name = useRef();

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const result = useQuery(ALL_AUTHORS);
  const handleUpdate = async (e) => {
    e.preventDefault();

    await editAuthor({
      variables: {
        name: name.current.value,
        setBornTo: parseInt(born.current.value),
      },
    });

    name.current.value = ``;
    born.current.value = ``;
  };
  const born = useRef();
  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data.allAuthors;
  const setName = (e) => {
    name.current.value = e.target.innerText;
  };
  return (
    <div style={{ display: props.show ? "block" : "none" }}>
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
      <AuthorEdit name={name} born={born} handleUpdate={handleUpdate} />
    </div>
  );
};

export default Authors;
