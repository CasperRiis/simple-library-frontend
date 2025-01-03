import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Switch,
  useToast,
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
    const formData = new FormData();
    formData.append("id", "0");
    formData.append(
      "title",
      (target.elements.namedItem("title") as HTMLInputElement)?.value
    );
    formData.append(
      "authorId",
      (target.elements.namedItem("authorId") as HTMLInputElement)?.value
    );
    formData.append("isHidden", isHidden.toString());
    formData.append(
      "genre",
      (target.elements.namedItem("genre") as HTMLInputElement)?.value
    );
    formData.append(
      "year",
      (target.elements.namedItem("year") as HTMLInputElement)?.value
    );
    const imageFile = (target.elements.namedItem("image") as HTMLInputElement)
      ?.files?.[0];
    if (imageFile) {
      formData.append("image", imageFile);
    }

    apiClient
      .postFormdata(formData)
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
      .catch((error) => {
        console.error("Error response:", error.response?.data);
        toast({
          title: "Post failed",
          description: `Unexpected error: ${
            JSON.stringify(error.response?.data) || error.message
          }. Please try again.`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <Box marginBottom={8} padding={6}>
      <Heading size="lg" mb={4}>
        Add a New Book
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Title</FormLabel>
          <Input type="text" name="title" required />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Author ID</FormLabel>
          <Input type="number" name="authorId" required />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Genre</FormLabel>
          <Input type="text" name="genre" required />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Year</FormLabel>
          <Input type="number" name="year" required />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Image</FormLabel>
          <Input type="file" name="image" accept="image/*" />
        </FormControl>
        <FormControl display="flex" alignItems="center" mb={4}>
          <FormLabel mb="0">Hidden</FormLabel>
          <Switch
            isChecked={isHidden}
            onChange={() => setIsHidden(!isHidden)}
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Add Book
        </Button>
      </form>
    </Box>
  );
};

export default BookAddPage;
