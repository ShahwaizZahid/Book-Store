import { list } from "./Freebook";
import Cards from "./Cards";
import { Link } from "react-router-dom";
export default function Course() {
  return (
    <>
      <div className="w-full   md:px-20 px-4 ">
        <div className="pt-28 items-center justify-center text-center">
          <h1 className="text-2xl  md:text-4xl ">
            We're delighted to have you{" "}
            <span className="text-pink-500">here! :)</span>{" "}
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
        <div className=" mt-12 grid grid-cols-1 md:grid-cols-4 ">
          {list.map((item) => (
            <Cards item={item} key={item.id} />
          ))}
        </div>
      </div>
    </>
  );
}
