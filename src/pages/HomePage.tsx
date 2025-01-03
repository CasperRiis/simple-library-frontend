import { useState, useEffect } from "react";
import BookGrid from "../components/BookGrid";
import GenreFilter from "../components/GenreFilter";
import { Divider } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";

const genres = ["Fantasy", "SciFi", "Kids", "Teen", "Autobiography"];

const HomePage = () => {
  const [genre, setGenre] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["books"] });
  }, [queryClient]);

  return (
    <>
      <GenreFilter genres={genres} onChange={setGenre} />
      <Divider />
      <BookGrid genre={genre} />
    </>
  );
};

export default HomePage;
