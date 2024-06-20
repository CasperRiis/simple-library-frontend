import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { useRef, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import useBook from "../hooks/useBook";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { data: book, refetch } = useBook(`title/${searchQuery}`, false);

  useEffect(() => {
    if (searchQuery && searchQuery.trim() !== "") {
      refetch();
    }
  }, [searchQuery, refetch]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (book) {
      navigate(`/book/${book.id}`);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <BsSearch />
        </InputLeftElement>
        <Input
          ref={ref}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          borderRadius={20}
          placeholder="Search books..."
          variant="filled"
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
