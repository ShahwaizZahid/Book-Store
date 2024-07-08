import Navbar from "../ui/Navbar";
import Banner from "../ui/Banner";
import Footer from "../ui/Footer";
import Freebook from "../ui/Freebook";
export default function Home() {
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Navbar />
        <Banner />
        <Freebook />
        <Footer />
      </div>
    </>
  );
}
