import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import Course from "../ui/Course";
export default function Courses() {
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Navbar />
        <div className="min-h-screen">
          <Course />
        </div>
        <Footer />
      </div>
    </>
  );
}
