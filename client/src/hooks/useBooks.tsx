import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BookInfo } from "./DataTypes";
export const useBook = () => {
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:4000/book", {
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
