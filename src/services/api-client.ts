import axios, { AxiosRequestConfig } from "axios";
import { Book } from "../entities/Book";
import { Author } from "../entities/Author";

const API_URL = import.meta.env.VITE_API_URL as string;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "x-api-key": import.meta.env.VITE_API_KEY as string,
  },
});

export interface FetchResponse<T> {
  count: number;
  results: T[];
}

class ApiClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config?: AxiosRequestConfig) =>
    axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);

  getOne = (data: string) =>
    axiosInstance.get<T>(`${this.endpoint}${data}`).then((res) => res.data);

  post = (data: T) =>
    axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);

  put = (data: T) =>
    axiosInstance.put<T>(this.endpoint, data).then((res) => res.data);

  delete = (data: number) =>
    axiosInstance.delete<T>(`${this.endpoint}${data}`).then((res) => res.data);
}

export default ApiClient;
