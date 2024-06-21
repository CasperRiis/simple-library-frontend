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
import getCroppendImageUrl from "../services/image-crop";
import useAuthor from "../hooks/useAuthor";
import { useAuth } from "../context/AuthContext";

const AuthorDetailPage = () => {
  const { id } = useParams();
  const { data: author, isLoading, error } = useAuthor(id!, true);
  const { isAuthenticated, role } = useAuth();

  if (isLoading) return <Spinner />;
  if (error || !author) throw error;

  return (
    <>
      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
        gap={5}
        padding="2vh"
      >
        <GridItem>
          <Heading>{author?.name}</Heading>{" "}
          {isAuthenticated && role === "Admin" ? (
            <Text> Author ID: {author?.id}</Text>
          ) : null}
          <Text>Nationality: {author?.nationality}</Text>
          <Text>Born in year: {author?.birthYear}</Text>
          {isAuthenticated && role === "Admin" ? (
            <Link to={`/author/${author?.id}/edit`}>
              <Button bgColor="darkorange" _hover={{ bgColor: "orange" }}>
                Edit
              </Button>
            </Link>
          ) : null}
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
