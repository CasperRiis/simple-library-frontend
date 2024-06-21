import { Book } from "../entities/Book";
import ApiClient, { FetchResponse } from "../services/api-client";
import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";

const apiClient = new ApiClient<Book>("book");

const useBooks = () => {
  return useInfiniteQuery<FetchResponse<Book>, Error>({
    queryKey: ["books"],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          page: pageParam,
        },
      }),
    staleTime: ms("1h"),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
};

export default useBooks;
