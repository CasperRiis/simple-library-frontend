import { Link, useParams } from "react-router-dom";
import {
  Heading,
  Spinner,
  Text,
  Image,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import useBook from "../hooks/useBook";
import getCroppendImageUrl from "../services/image-crop";
import useAuthor from "../hooks/useAuthor";

const BookDetailPage = () => {
  const { id } = useParams();
  const { data: book, isLoading, error } = useBook(id!, true);
  const { data: author } = useAuthor(
    book?.authorId ? String(book.authorId) : "",
    true
  );

  if (isLoading) return <Spinner />;
  if (error || !book) throw error;

  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" gap={5}>
        <GridItem>
          <Heading>{book.title}</Heading>
          <Text>Genre: {book.genre}</Text>
          <Text>Released in year: {book.year}</Text>
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
