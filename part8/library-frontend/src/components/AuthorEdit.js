import React from "react";

import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const AuthorEdit = ({ name, born, setError }) => {
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      error.graphQLErrors > 0
        ? setError(error.graphQLErrors[0].message)
        : setError(error.message);
    },
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("DOING UPDATE AUTHOR");
    try {
      await editAuthor({
        variables: {
          name: name.current.value,
          setBornTo: parseInt(born.current.value),
        },
      });
    } catch (e) {
      console.log(e);
    }

    name.current.value = ``;
    born.current.value = ``;
  };

  return (
    <form onSubmit={(e) => handleUpdate(e)}>
      <h4>Edit existing author birth year by clicking on the name</h4>
      <label>
        name
        <input type="text" ref={name} readOnly={true} />
      </label>
      <label>
        born
        <input type="number" ref={born} />
      </label>
      <button type="submit">update author</button>
    </form>
  );
};

export default AuthorEdit;
