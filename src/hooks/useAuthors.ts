import { Author } from "../entities/Author";
import ApiClient, { FetchResponse } from "../services/api-client";
import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";

const apiClient = new ApiClient<Author>("author");

const useAuthors = () => {
  return useInfiniteQuery<FetchResponse<Author>, Error>({
    queryKey: ["authors"],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          page: pageParam,
        },
      }),
    staleTime: ms("5m"),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
};

export default useAuthors;
