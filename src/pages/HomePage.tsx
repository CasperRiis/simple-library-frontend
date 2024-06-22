import { useState } from "react";
import BookGrid from "../components/BookGrid";
import GenreFilter from "../components/GenreFilter";
import { Divider } from "@chakra-ui/react";

const genres = ["Fantasy", "SciFi", "Kids", "Teen", "Autobiography"];

const HomePage = () => {
  const [genre, setGenre] = useState("");
  return (
    <>
      <GenreFilter genres={genres} onChange={setGenre} />
      <Divider />
      <BookGrid genre={genre} />
    </>
  );
};

export default HomePage;
