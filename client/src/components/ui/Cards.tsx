export default function Cards({ item }: any) {
  return (
    <div className="mt-4 my-3 p-3 ">
      <div className="card bg-base-100 w-92 shadow-xl transform hover:scale-105 duration-200 transition-transform dark:border dark:bg-slate-900 dark:text-white">
        <figure>
          <img src="Banner.png" alt="Banner.jpg" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {item.name}
            <div className="badge badge-secondary">{item.catagory}</div>
          </h2>
          <p>{item.title}</p>
          <div className="card-actions flex justify-between">
            <div className="badge badge-outline">${item.price}</div>
            <div className="cursor-pointer hover:bg-pink-500 rounded-full  border-[2px] hover:text-white px-2 py-1">
              Buy now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
