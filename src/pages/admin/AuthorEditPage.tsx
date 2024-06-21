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
import useAuthor from "../../hooks/useAuthor";
import { Author } from "../../entities/Author";

const apiClient = new ApiClient<Author>("author/");

const AuthorEditPage = () => {
  const { id } = useParams();
  const { data: author } = useAuthor(id!, true);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const author: Author = {
      id: Number((target.elements.namedItem("id") as HTMLInputElement)?.value),
      name: (target.elements.namedItem("name") as HTMLInputElement)?.value,
      nationality: (
        target.elements.namedItem("nationality") as HTMLInputElement
      )?.value,
      birthYear: Number(
        (target.elements.namedItem("birthYear") as HTMLInputElement)?.value
      ),
      imageUrl: (target.elements.namedItem("imageUrl") as HTMLInputElement)
        ?.value,
    };
    apiClient
      .put(author)
      .then(() => {
        navigate(`/author/${author.id}`);
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
      .delete(author!.id)
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
        Edit Author
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
              defaultValue={author?.id}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              required
              defaultValue={author?.name}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Nationality</FormLabel>
            <Input
              type="text"
              name="nationality"
              required
              defaultValue={author?.nationality}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Birth Year</FormLabel>
            <Input
              type="number"
              name="birthYear"
              required
              defaultValue={author?.birthYear}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Image URL</FormLabel>
            <Input
              type="text"
              name="imageUrl"
              defaultValue={author?.imageUrl}
            />
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

export default AuthorEditPage;
