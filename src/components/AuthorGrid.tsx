import { Button, SimpleGrid, Spinner } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import React from "react";
import useAuthors from "../hooks/useAuthors";
import AuthorCard from "./AuthorCard";

const AuthorGrid = () => {
  const {
    data,
    isLoading,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useAuthors();

  const fetchedBooksCount =
    data?.pages.reduce((acc, page) => acc + page.results.length, 0) || 0;

  if (isLoading) return <Spinner />;
  if (error) throw error;

  return (
    <>
      <InfiniteScroll
        dataLength={fetchedBooksCount}
        next={() => {}}
        hasMore={hasNextPage || false}
        loader={<Spinner />}
      >
        <SimpleGrid
          columns={{ sm: 4, md: 5, lg: 6, xl: 7 }}
          spacing={5}
          padding="1vh"
        >
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.results.map((author) => (
                <AuthorCard key={author.id} author={author} />
              ))}
            </React.Fragment>
          ))}
        </SimpleGrid>
        {hasNextPage && (
          <Button onClick={() => fetchNextPage()} marginY={5}>
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </Button>
        )}
      </InfiniteScroll>
    </>
  );
};

export default AuthorGrid;
