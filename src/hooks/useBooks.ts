import { useState, useEffect } from "react";
import { Book } from "../entities/Book";
import ApiClient, { FetchResponse } from "../services/api-client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import useBookQueryStore from "../store";
import ms from "ms";

const apiClient = new ApiClient<Book>("book/");

const useBooks = () =>
  useQuery<FetchResponse<Book>>({
    queryKey: ["books"],
    queryFn: () => apiClient.getAll(),
    staleTime: ms("1h"),
  });

export default useBooks;
