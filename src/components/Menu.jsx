import { useSelector } from "react-redux";

export default function Menu() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div className="p-5 bg-gray-800 flex justify-between items-center text-stone-50 h-[12%]">
        <h1 className="font-bold text-3xl text-amber-600 font-serif">
          King<span className="font-sans text-teal-600">TECH</span>
        </h1>
        <div className="flex items-center gap-x-5">
          <h1 className="font-bold uppercase">
            {user ? "Hello " + user.username : "Guest"}
          </h1>
          <div className="w-10 h-10 bg-black rounded-full"></div>
        </div>
      </div>
    </>
  );
}
