import { Box, Card, CardBody, Heading, Image } from "@chakra-ui/react";
import getCroppendImageUrl from "../services/image-crop";
import { Link } from "react-router-dom";
import { Author } from "../entities/Author";

interface Props {
  author: Author;
}

const AuthorCard = ({ author }: Props) => {
  return (
    <Box
      _hover={{
        boxShadow: "0 0 10px 5px rgba(0, 0, 0, 0.1)",
        transform: "scale(1.02)",
        transition: "all 0.2s",
      }}
      overflow="hidden"
      borderRadius={10}
    >
      <Link to={`/author/${author.id}`}>
        <Card>
          <Image
            src={getCroppendImageUrl(author.imageUrl)}
            overflow="hidden"
            objectFit="cover"
            height="250px"
            borderRadius="10"
          ></Image>
          <CardBody>
            <Heading fontSize="2x1">{author.name}</Heading>
          </CardBody>
        </Card>
      </Link>
    </Box>
  );
};

export default AuthorCard;
