import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { USER } from "../queries";

const RecommendGenre = ({ show, books }) => {
  const user = useQuery(USER);
  const [filtered, setFiltered] = useState([]);

  const favourite = user?.data?.me?.favourite;

  useEffect(() => {
    setFiltered(books.filter((b) => b.genres.includes(favourite)));
  }, [books, favourite]);

  if (!show || !user.data || !books) {
    return null;
  }

  if (user.loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filtered.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecommendGenre;
