import React, { useState } from "react";
import { Box, Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";

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
        <Stack direction="row" spacing={4} justify="space-between">
          {genres.map((genre) => (
            <Checkbox key={genre} value={genre}>
              {genre}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </Box>
  );
};

export default GenreFilter;
