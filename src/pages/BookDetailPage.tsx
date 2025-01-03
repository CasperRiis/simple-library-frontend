import { Link, useParams } from "react-router-dom";
import {
  Heading,
  Spinner,
  Text,
  Image,
  Grid,
  GridItem,
  Button,
} from "@chakra-ui/react";
import useBook from "../hooks/useBook";
import getCroppendImageUrl from "../services/image-crop";
import useAuthor from "../hooks/useAuthor";
import { useAuth } from "../context/AuthContext";

const BookDetailPage = () => {
  const { id } = useParams();
  const { data: book, isLoading, error } = useBook(id!, true);
  const { data: author } = useAuthor(
    book?.authorId ? String(book.authorId) : "",
    true
  );
  const { isAuthenticated, role } = useAuth();

  if (isLoading) return <Spinner />;
  if (error || !book) throw error;

  return (
    <>
      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
        gap={5}
        padding="2vh"
      >
        <GridItem>
          <Heading>{book.title}</Heading>
          {isAuthenticated && role === "Admin" ? (
            <Text> Book ID: {book.id}</Text>
          ) : null}
          <Text>Genre: {book.genre}</Text>
          <Text>Released in year: {book.year}</Text>
          {isAuthenticated && role === "Admin" ? (
            <Link to={`/book/${book.id}/edit`}>
              <Button bgColor="darkorange" _hover={{ bgColor: "orange" }}>
                Edit
              </Button>
            </Link>
          ) : null}
          {isAuthenticated && role === "Admin" ? (
            <Text>Is Hidden: {book.isHidden.toString()}</Text>
          ) : null}
        </GridItem>
        <GridItem>
          <Image
            src={getCroppendImageUrl(book.imageUrl)}
            alt={book.title}
            maxHeight="400px"
            maxWidth="600px"
            borderRadius="10"
          />
        </GridItem>

        <GridItem>
          <Heading>{author?.name}</Heading>
          {isAuthenticated && role === "Admin" ? (
            <Text> Author ID: {author?.id}</Text>
          ) : null}
          <Text>Nationality: {author?.nationality}</Text>
          <Text>Born in year: {author?.birthYear}</Text>
        </GridItem>
        <GridItem>
          <Link to={`/author/${author?.id}`}>
            <Image
              src={getCroppendImageUrl(
                author?.imageUrl ? String(author.imageUrl) : ""
              )}
              alt={author?.name}
              maxHeight="400px"
              maxWidth="600px"
              borderRadius="10"
            />
          </Link>
        </GridItem>
      </Grid>
    </>
  );
};

export default BookDetailPage;
