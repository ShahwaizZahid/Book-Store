export default function Cards({ item }: any) {
  return (
    <div className="mt-4 my-3 p-3 w-80 h-[500px]">
      <div className="card bg-base-100 w-full h-full shadow-xl transform hover:scale-105 duration-200 transition-transform dark:border dark:bg-slate-900 dark:text-white">
        <figure className="relative w-full h-90">
          <span className="badge badge-secondary absolute top-0 right-0 m-4 p-2">
            {item.volumeInfo.category}
          </span>
          <img
            className="w-full h-full object-cover"
            src={item.volumeInfo.imageLinks?.thumbnail || ""}
            alt="Book Cover"
          />
        </figure>
        <div className="card-body p-4">
          <h2 className="card-title text-lg font-bold mb-2 truncate">
            {item.volumeInfo.title}
          </h2>
          <div className="card-actions flex justify-between items-center mt-4">
            <div className="badge badge-outline">${item.volumeInfo.price}</div>
            <div className="cursor-pointer hover:bg-pink-500 rounded-full border-[2px] hover:text-white px-4 py-2">
              Buy now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
