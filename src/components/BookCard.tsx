import { Card, CardBody, Heading, Image } from "@chakra-ui/react";
import { Book } from "../entities/Book";
import getCroppendImageUrl from "../services/image-crop";
import { Link } from "react-router-dom";

interface Props {
  book: Book;
}

const BookCard = ({ book }: Props) => {
  return (
    <Link to={`/book/${book.id}`}>
      <Card>
        <Image
          src={getCroppendImageUrl(book.imageUrl)}
          overflow="hidden"
          objectFit="cover"
          height="500px"
          borderRadius="10"
        ></Image>
        <CardBody>
          <Heading fontSize="2x1">{book.title}</Heading>
        </CardBody>
      </Card>
    </Link>
  );
};

export default BookCard;
