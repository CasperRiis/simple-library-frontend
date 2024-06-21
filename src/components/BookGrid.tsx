import { Button, SimpleGrid, Spinner } from "@chakra-ui/react";
import useBooks from "../hooks/useBooks";
import BookCard from "./BookCard";
import BookCardContainer from "./BookCardContainer";
import InfiniteScroll from "react-infinite-scroll-component";
import React from "react";
import BookCardSkeleton from "./BookCardSkeleton";

const BookGrid = () => {
  const {
    data,
    isLoading,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useBooks();

  const fetchedBooksCount =
    data?.pages.reduce((acc, page) => acc + page.results.length, 0) || 0;

  const skeletons = [...Array(12).keys()];

  if (error) throw error;

  return (
    <>
      <InfiniteScroll
        dataLength={fetchedBooksCount}
        next={() => fetchNextPage()}
        hasMore={hasNextPage || false}
        loader={<Spinner />}
      >
        <SimpleGrid
          columns={{ sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing={10}
          padding="2vh"
        >
          {isLoading &&
            skeletons.map((skeleton) => (
              <BookCardContainer key={skeleton}>
                <BookCardSkeleton />
              </BookCardContainer>
            ))}
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.results.map((book) => (
                <BookCardContainer key={book.id}>
                  <BookCard book={book} />
                </BookCardContainer>
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

export default BookGrid;
