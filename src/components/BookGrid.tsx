import { Flex, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import useBooks from "../hooks/useBooks";
import BookCard from "./BookCard";
import BookCardContainer from "./BookCardContainer";
import InfiniteScroll from "react-infinite-scroll-component";

const BookGrid = () => {
  const { data: books, isLoading, error } = useBooks();

  if (isLoading) return <Spinner />;
  if (error || !books) throw error;

  return (
    <SimpleGrid
      columns={{ sm: 2, md: 3, lg: 4, xl: 5 }}
      spacing={10}
      padding="10"
    >
      {books.results.map((book) => (
        <BookCardContainer key={book.id}>
          <BookCard book={book} />
        </BookCardContainer>
      ))}
    </SimpleGrid>
  );
};

export default BookGrid;
