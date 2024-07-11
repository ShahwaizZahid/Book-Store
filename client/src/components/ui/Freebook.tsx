import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "./Cards";
import { useBook } from "../../hooks/useBooks";
import { BookInfo } from "../../hooks/useBooks";
import CardSkelton from "./CardSkelton";
import { settings } from "../../hooks/DataTypes";

export default function Freebook() {
  const { isLoading, data, error } = useBook();

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full md:px-20">
      <div>
        <h1 className="font-semibold text-xl pb-2">Free offered courses</h1>
        <p>
          At [Your Bookstore Name], we believe that the joy of reading should be
          accessible to everyone. That's why we're thrilled to offer a curated
          selection of free books for our valued readers. Dive into a world of
          stories, knowledge, and inspiration without spending a dime.
        </p>
      </div>
      <div className="slider-container">
        {isLoading ? (
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
            {data
              .filter((item: BookInfo) => {
                return item.volumeInfo.category === "free";
              })
              .map((item: BookInfo) => (
                <Cards item={item} key={item.id} />
              ))}
          </Slider>
        )}
      </div>
    </div>
  );
}
