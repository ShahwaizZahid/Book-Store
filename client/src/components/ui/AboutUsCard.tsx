export default function AboutUsCard() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 flex justify-center items-center p-8 mx-2">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-md shadow-md max-w-2xl">
        <h2 className="text-3xl font-bold mb-4 text-center dark:text-white">
          About Us
        </h2>
        <p className="mb-4 dark:text-gray-200">
          Welcome to our BoundBookery! We are dedicated to providing a wide
          range of books for readers of all ages and interests. Whether you're
          looking for the latest bestseller or a classic novel, we have
          something for everyone.
        </p>
        <p className="mb-4 dark:text-gray-200">
          Our home page features a banner showcasing our latest offers and a
          selection of free books for you to enjoy. Be sure to check back often,
          as we are always updating our collection with new and exciting titles.
        </p>
        <p className="mb-4 dark:text-gray-200">
          On our courses page, you can find both paid and free books, carefully
          curated to offer valuable learning resources across various subjects.
          We believe in making knowledge accessible to everyone, which is why we
          offer a range of free courses alongside our premium content.
        </p>
        <p className="mb-4 dark:text-gray-200">
          If you have any questions or need assistance, feel free to reach out
          to us through our contact page. We are here to help and ensure you
          have the best experience possible with our bookstore.
        </p>
        <p className="mb-4 dark:text-gray-200">
          Please note that our contact page is accessible only to logged-in
          users. This ensures we can provide personalized support to our valued
          customers. If you haven't already, please log in or sign up to access
          the contact page and get in touch with us.
        </p>
        <p className="mb-4 dark:text-gray-200">
          Thank you for choosing our BoundBookery. Happy reading!
        </p>
      </div>
    </div>
  );
}
