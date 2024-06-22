import { Book } from "../entities/Book";
import ApiClient, { FetchResponse } from "../services/api-client";
import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";

const apiClient = new ApiClient<Book>("book");

const useBooks = (genre?: string) => {
  return useInfiniteQuery<FetchResponse<Book>, Error>({
    queryKey: ["books", genre].filter(Boolean),
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          page: pageParam,
          ...(genre ? { searchGenre: genre } : {}),
        },
      }),
    staleTime: ms("5m"),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
};

export default useBooks;
