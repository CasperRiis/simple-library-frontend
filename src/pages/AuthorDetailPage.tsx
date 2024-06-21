import { useParams } from "react-router-dom";
import {
  Heading,
  Spinner,
  Text,
  Image,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import getCroppendImageUrl from "../services/image-crop";
import useAuthor from "../hooks/useAuthor";

const AuthorDetailPage = () => {
  const { id } = useParams();
  const { data: author, isLoading, error } = useAuthor(id!, true);

  if (isLoading) return <Spinner />;
  if (error || !author) throw error;

  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" gap={5}>
        <GridItem>
          <Heading>{author?.name}</Heading>
          <Text>Nationality: {author?.nationality}</Text>
          <Text>Born in year: {author?.birthYear}</Text>
        </GridItem>
        <GridItem>
          <Image
            src={getCroppendImageUrl(
              author?.imageUrl ? String(author.imageUrl) : ""
            )}
            alt={author.name}
            maxHeight="400px"
            maxWidth="600px"
            borderRadius="10"
          />
        </GridItem>
      </Grid>
    </>
  );
};

export default AuthorDetailPage;
