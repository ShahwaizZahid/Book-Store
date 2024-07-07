import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "./ui/Cards";

const list = [
  {
    id: 1,
    name: "storybook",
    title: "fhfdfkuiuffrebvbubvburuberebvkerbrj",
    price: 0,
    catagory: "free",
    image: "Banner.jpg",
  },
  {
    id: 1,
    name: "storybook",
    title: "fhfdfkuiuffrebvbubvburuberebvkerbrj",
    price: 0,
    catagory: "free",
    image: "Banner.jpg",
  },
  {
    id: 1,
    name: "storybook",
    title: "fhfdfkuiuffrebvbubvburuberebvkerbrj",
    price: 0,
    catagory: "free",
    image: "Banner.jpg",
  },
  {
    id: 1,
    name: "storybook",
    title: "fhfdfkuiuffrebvbubvburuberebvkerbrj",
    price: 0,
    catagory: "free",
    image: "Banner.jpg",
  },
  {
    id: 1,
    name: "storybook",
    title: "fhfdfkuiuffrebvbubvburuberebvkerbrj",
    price: 0,
    catagory: "free",
    image: "Banner.jpg",
  },
  {
    id: 1,
    name: "storybook",
    title: "fhfdfkuiuffrebvbubvburuberebvkerbrj",
    price: 0,
    catagory: "free",
    image: "Banner.jpg",
  },
  {
    id: 1,
    name: "storybook",
    title: "fhfdfkuiuffrebvbubvburuberebvkerbrj",
    price: 0,
    catagory: "free",
    image: "Banner.jpg",
  },
  {
    id: 1,
    name: "storybook",
    title: "fhfdfkuiuffrebvbubvburuberebvkerbrj",
    price: 0,
    catagory: "free",
    image: "Banner.jpg",
  },
  {
    id: 1,
    name: "storybook",
    title: "fhfdfkuiuffrebvbubvburuberebvkerbrj",
    price: 0,
    catagory: "free",
    image: "Banner.jpg",
  },
  {
    id: 1,
    name: "storybook",
    title: "fhfdfkuiuffrebvbubvburuberebvkerbrj",
    price: 0,
    catagory: "free",
    image: "Banner.jpg",
  },
];

export default function Freebook() {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const filterData = list.filter((data) => {
    return data.catagory === "free";
  });
  return (
    <>
      <div className="w-full   md:px-20 ">
        <div>
          <h1 className="font-semibold text-xl  pb-2">Free offered courses</h1>
          <p>
            At [Your Bookstore Name], we believe that the joy of reading should
            be accessible to everyone. That's why we're thrilled to offer a
            curated selection of free books for our valued readers. Dive into a
            world of stories, knowledge, and inspiration without spending a
            dime.
          </p>
        </div>
        <div className="slider-container">
          <Slider {...settings}>
            {filterData.map((item) => (
              <Cards item={item} key={item.id} />
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
