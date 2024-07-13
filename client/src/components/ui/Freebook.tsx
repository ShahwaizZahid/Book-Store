import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "./Cards";
import { useBook } from "../../hooks/useBooks";
import { BookInfo } from "../../hooks/DataTypes";
import CardSkelton from "./CardSkelton";
import { settings } from "../../hooks/DataTypes";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Freebook() {
  const { isLoading, data = [], error } = useBook();

  if (error) return <div>Error: {error.message}</div>;

  const filteredData = Array.isArray(data)
    ? data.filter((item: BookInfo) => item.volumeInfo.category === "free")
    : [];

  return (
    <div className="w-full md:px-20">
      <div>
        <h1 className="font-semibold text-xl pb-2">Free offered courses</h1>
        <p>
          At BoundBookery, we believe that the joy of reading should be
          accessible to everyone. That's why we're thrilled to offer a curated
          selection of free books for our valued readers. Dive into a world of
          stories, knowledge, and inspiration without spending a dime.
        </p>
      </div>
      <div className="slider-container my-8">
        {isLoading || !Array.isArray(data) || data.length === 0 ? (
          <Slider {...settings}>
            <CardSkelton />
            <CardSkelton />
            <CardSkelton />
            <CardSkelton />
            <CardSkelton />
            <CardSkelton />
            <CardSkelton />
          </Slider>
        ) : (
          <Slider {...settings}>
            {filteredData.map((item: BookInfo) => (
              <Link to={`/detail/${item._id}`} key={item._id}>
                <Cards item={item} />
              </Link>
            ))}
          </Slider>
        )}
      </div>
      <Toaster />
    </div>
  );
}
