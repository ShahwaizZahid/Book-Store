import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL_book } from "../config";

export const useBook = () => {
  const fetchBooks = async () => {
    try {
      console.log(API_URL_book);
      const response = await axios.get(`${API_URL_book}/book`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching books:", error);
      return error;
    }
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  return {
    data,
    error,
    isLoading,
  };
};
