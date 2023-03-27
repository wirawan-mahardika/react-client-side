import { NavLink } from "react-router-dom";
// import BarangSetting from "./BarangSetting";

export default function () {
  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <div className="grid grid-cols-2 my-auto gap-y-8">
          <p className="font-bold text-3xl uppercase text-center col-span-2">
            Select Setting Below
          </p>
          <ul className="flex gap-x-10 col-span-2 mx-auto">
            <li>
              <NavLink
                to={"/setting-barang"}
                className={"px-4 py-2 bg-blue-500 rounded-md cursor-pointer"}
              >
                Pengaturan Items
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/barang"}
                className={"px-4 py-2 bg-blue-500 rounded-md cursor-pointer"}
              >
                Tambah Item
              </NavLink>
            </li>
          </ul>
          {/* <div className="col-span-2 mt-4">
          <BarangSetting />
        </div> */}
        </div>
      </div>
    </>
  );
}
