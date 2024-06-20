import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import { Author } from "../entities/Author";
import ms from "ms";

const apiClient = new ApiClient<Author>("author/");

const useAuthor = (data: string, enabled: boolean) =>
  useQuery({
    queryKey: ["author", data],
    queryFn: () => apiClient.getOne(data!.toString()),
    enabled: enabled,
  });

export default useAuthor;
