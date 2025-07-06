import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { API_URL_book } from "../config";
import { BookInfo, UseBookReturn } from "./DataTypes";

export const useBook = (): UseBookReturn => {
  const fetchBooks = async (): Promise<BookInfo[]> => {
    try {
      const response = await axios.get(`${API_URL_book}/book`, {
        withCredentials: true,
      });
      return response.data || [];
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  };

  const {
    data = [],
    error,
    isLoading,
  } = useQuery<BookInfo[], AxiosError>({
    queryKey: ["books"],
    queryFn: fetchBooks,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  return {
    data,
    error,
    isLoading,
  };
};
