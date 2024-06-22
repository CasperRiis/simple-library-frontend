import { useState } from "react";
import BookGrid from "../components/BookGrid";
import GenreFilter from "../components/GenreFilter";

const genres = ["Fantasy", "SciFi", "Kids", "Teen", "Autobiography"];

const HomePage = () => {
  const [genre, setGenre] = useState("");
  return (
    <>
      <GenreFilter genres={genres} onChange={setGenre} />
      <BookGrid genre={genre} />
    </>
  );
};

export default HomePage;
