import React, { useState } from "react";
import { Box, Checkbox, CheckboxGroup, Wrap } from "@chakra-ui/react";

interface Props {
  genres: string[];
  onChange: (selectedGenre: string) => void;
}

const GenreFilter: React.FC<Props> = ({ genres, onChange }) => {
  const [selectedGenre, setSelectedGenre] = useState<string>("");

  const handleGenreChange = (nextValue: string[]) => {
    const valueToSet = nextValue[nextValue.length - 1];
    if (valueToSet === selectedGenre) {
      setSelectedGenre("");
      onChange("");
    } else {
      setSelectedGenre(valueToSet);
      onChange(valueToSet);
    }
  };

  return (
    <Box p={4} width="100%">
      <CheckboxGroup
        value={[selectedGenre]}
        onChange={(values) => handleGenreChange(values as string[])}
      >
        <Wrap spacing="4" justify="flex-start">
          {genres.map((genre) => (
            <Checkbox key={genre} value={genre}>
              {genre}
            </Checkbox>
          ))}
        </Wrap>
      </CheckboxGroup>
    </Box>
  );
};

export default GenreFilter;
