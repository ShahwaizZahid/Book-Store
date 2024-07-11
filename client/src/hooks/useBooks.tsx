import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export type BookInfo = {
  id: string;
  volumeInfo: {
    price: string;
    category: string;
    title: string;
    subtitle: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    pageCount: number;
    categories: string[];
    imageLinks: {
      thumbnail: string;
    };
    language: string;
  };
  searchInfo: {
    textSnippet: string;
  };
};
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
