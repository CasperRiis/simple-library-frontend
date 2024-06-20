import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import { Book } from "../entities/Book";

const apiClient = new ApiClient<Book>("book/");

const useBook = (data: string, enabled: boolean) =>
  useQuery({
    queryKey: ["book", data],
    queryFn: () => apiClient.getOne(data!.toString()),
    enabled: enabled,
  });

export default useBook;
