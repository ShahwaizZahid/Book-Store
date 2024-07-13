import React from "react";
import Cards from "./Cards";
import { Link } from "react-router-dom";
import { BookInfo } from "../../hooks/DataTypes";
import { useBook } from "../../hooks/useBooks";
import CardSkelton from "./CardSkelton";

export default function Course() {
  const { isLoading, error, data } = useBook();

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="w-full md:px-20 px-4">
        <div className="pt-28 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-pink-500">here! :)</span>
          </h1>
          <p className="mt-12">
            Our courses are designed to empower learners with practical skills
            and knowledge in various fields. Whether you're interested in
            technology, business, or creative arts, our expert instructors
            provide hands-on training and real-world insights. Join us to
            advance your career, explore new hobbies, or simply learn something
            new. Flexible schedules and personalized learning paths make it easy
            to achieve your goals.
          </p>
          <button className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 mt-6">
            <Link to="/"> Back</Link>
          </button>
        </div>

        {isLoading || !Array.isArray(data) || data.length === 0 ? (
          <div className="mt-12 grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
            <CardSkelton />
            <CardSkelton />
            <CardSkelton />
            <CardSkelton />
            <CardSkelton />
            <CardSkelton />
            <CardSkelton />
          </div>
        ) : (
          <div className="mt-12 grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
            {data.map((item: BookInfo) => (
              <Link to={`/detail/${item._id}`} key={item._id}>
                <Cards item={item} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
