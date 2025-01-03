import {
  Heading,
  Box,
  SimpleGrid,
  FormControl,
  Button,
  FormLabel,
  Input,
  useToast,
  Switch,
} from "@chakra-ui/react";
import ApiClient from "../../services/api-client";
import { Book } from "../../entities/Book";
import useBooks from "../../hooks/useBooks";
import { useState } from "react";

const apiClient = new ApiClient<Book>("book");

const BookAddPage = () => {
  const { refetch } = useBooks();
  const toast = useToast();
  const [isHidden, setIsHidden] = useState(false);

  const handleSubmit = (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const book: Book = {
      id: 0,
      title: (target.elements.namedItem("title") as HTMLInputElement)?.value,
      authorId: Number(
        (target.elements.namedItem("authorId") as HTMLInputElement)?.value
      ),
      isHidden: isHidden,
      genre: (target.elements.namedItem("genre") as HTMLInputElement)?.value,
      year: Number(
        (target.elements.namedItem("year") as HTMLInputElement)?.value
      ),
      imageUrl: (target.elements.namedItem("imageUrl") as HTMLInputElement)
        ?.value,
    };
    apiClient
      .post(book)
      .then(() => {
        refetch();
        event.target.reset();
        toast({
          title: "Post success",
          description: "Book created successfully.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: "Post failed",
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
        Add Book
      </Heading>
      <Box as="form" onSubmit={handleSubmit}>
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={4}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input type="text" name="title" required />
          </FormControl>
          <FormControl>
            <FormLabel>Author ID</FormLabel>
            <Input type="number" name="authorId" required />
          </FormControl>
          <FormControl>
            <FormLabel>Genre</FormLabel>
            <Input type="text" name="genre" required />
          </FormControl>
          <FormControl>
            <FormLabel>Release Year</FormLabel>
            <Input type="number" name="year" required />
          </FormControl>
          <FormControl>
            <FormLabel>Image URL</FormLabel>
            <Input type="text" name="imageUrl" />
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">Is Hidden</FormLabel>
            <Switch
              name="isHidden"
              isChecked={isHidden}
              onChange={(e) => setIsHidden(e.target.checked)}
            />
          </FormControl>
        </SimpleGrid>
        <Button type="submit" mt={4}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default BookAddPage;
