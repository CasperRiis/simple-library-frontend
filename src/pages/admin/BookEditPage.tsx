import { useNavigate, useParams } from "react-router-dom";
import {
  Heading,
  Box,
  SimpleGrid,
  FormControl,
  Button,
  FormLabel,
  Input,
  useToast,
  Divider,
} from "@chakra-ui/react";
import ApiClient from "../../services/api-client";
import { Book } from "../../entities/Book";
import useBook from "../../hooks/useBook";

const apiClient = new ApiClient<Book>("book/");

const BookEditPage = () => {
  const { id } = useParams();
  const { data: book } = useBook(id!, true);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const book: Book = {
      id: Number((target.elements.namedItem("id") as HTMLInputElement)?.value),
      title: (target.elements.namedItem("title") as HTMLInputElement)?.value,
      authorId: Number(
        (target.elements.namedItem("authorId") as HTMLInputElement)?.value
      ),
      genre: (target.elements.namedItem("genre") as HTMLInputElement)?.value,
      year: Number(
        (target.elements.namedItem("year") as HTMLInputElement)?.value
      ),
      imageUrl: (target.elements.namedItem("imageUrl") as HTMLInputElement)
        ?.value,
    };
    apiClient
      .put(book)
      .then(() => {
        navigate(`/book/${book.id}`);
      })
      .catch(() => {
        toast({
          title: "Put failed",
          description: "Unexpected error. Please try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const handleDelete = () => {
    apiClient
      .delete(book!.id)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        toast({
          title: "Delete failed",
          description: "Unexpected error. Please try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <Box marginBottom={8} padding={6}>
      <Heading size="lg" mb={4}>
        Edit Book
      </Heading>
      <Box as="form" onSubmit={handleSubmit}>
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={4}>
          <FormControl>
            <FormLabel>Id</FormLabel>
            <Input
              type="number"
              name="id"
              required
              isDisabled
              defaultValue={book?.id}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              name="title"
              required
              defaultValue={book?.title}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Author ID</FormLabel>
            <Input
              type="number"
              name="authorId"
              required
              defaultValue={book?.authorId}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Genre</FormLabel>
            <Input
              type="text"
              name="genre"
              required
              defaultValue={book?.genre}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Year</FormLabel>
            <Input
              type="number"
              name="year"
              required
              defaultValue={book?.year}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Image URL</FormLabel>
            <Input type="text" name="imageUrl" defaultValue={book?.imageUrl} />
          </FormControl>
        </SimpleGrid>
        <Button type="submit" mt={4}>
          Submit
        </Button>
      </Box>
      <Divider marginY={4} />
      <Button
        onClick={handleDelete}
        bgColor="darkred"
        _hover={{ bgColor: "red" }}
      >
        Delete
      </Button>
    </Box>
  );
};

export default BookEditPage;
