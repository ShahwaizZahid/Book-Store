import Navbar from "../ui/Navbar";
import Banner from "../ui/Banner";
import Footer from "../ui/Footer";
import Freebook from "../ui/Freebook";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-slate-900 dark:text-white transition-colors duration-300 ease-in-out overflow-x-hidden">
      <Navbar />
      <Banner />
      <Freebook />
      <Footer />
    </div>
  );
}
