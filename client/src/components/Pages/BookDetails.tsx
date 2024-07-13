import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBook } from "../../hooks/useBooks";
import { BookInfo } from "../../hooks/DataTypes";

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: books } = useBook();
  const navigate = useNavigate();

  // Find the book only if books are available
  const book = books ? books.find((book: BookInfo) => book._id === id) : null;

  if (!book) return <div>Book not found</div>;

  const {
    title,
    subtitle,
    authors,
    publisher,
    publishedDate,
    description,
    pageCount,
    categories,
    imageLinks,
    language,
    price,
    category,
  } = book.volumeInfo;

  return (
    <div className="flex flex-col items-center bg-gray-100 dark:bg-slate-900 p-8 min-h-screen">
      <button
        className="my-8 border-2 border-white py-2 px-3 rounded-lg bg-pink-500 hover:bg-transparent"
        onClick={() => navigate(-1)} // Use navigate for back
      >
        Back
      </button>
      <div className="bg-white dark:bg-slate-800 p-8 rounded-md shadow-md max-w-[80%] w-full">
        <div className="flex flex-col md:flex-row mb-4">
          {imageLinks?.thumbnail && (
            <img
              src={imageLinks.thumbnail}
              alt={`${title} cover`}
              className="w-full md:w-1/3 rounded-md shadow-md mb-4 md:mb-0"
            />
          )}
          <div className="md:ml-4">
            <h2 className="text-3xl font-bold mb-2 dark:text-white">{title}</h2>
            {subtitle && (
              <h3 className="text-xl mb-2 dark:text-gray-300">{subtitle}</h3>
            )}
            <p className="text-lg mb-2 dark:text-gray-300">{`Authors: ${authors.join(
              ", "
            )}`}</p>
            <p className="text-lg mb-2 dark:text-gray-300">{`Publisher: ${publisher}`}</p>
            <p className="text-lg mb-2 dark:text-gray-300">{`Published Date: ${publishedDate}`}</p>
            <p className="text-lg mb-2 dark:text-gray-300">{`Category: ${category}`}</p>
            <p className="text-lg mb-2 dark:text-gray-300">{`Price: ${price}`}</p>
          </div>
        </div>
        <div className="mb-4">
          <h4 className="text-2xl font-bold mb-2 dark:text-white">
            Description
          </h4>
          <p className="dark:text-gray-300">{description}</p>
        </div>
        <div className="mb-4">
          <h4 className="text-2xl font-bold mb-2 dark:text-white">Details</h4>
          <p className="dark:text-gray-300">{`Page Count: ${pageCount}`}</p>
          <p className="dark:text-gray-300">{`Categories: ${categories.join(
            ", "
          )}`}</p>
          <p className="dark:text-gray-300">{`Language: ${language}`}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
