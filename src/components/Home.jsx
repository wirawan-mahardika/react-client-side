import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getme } from "../actions/authSlice";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getme());
  }, []);

  return (
    <>
      <div className="flex items-center justify-center flex-col h-full gap-y-3">
        <p className="font-bold text-4xl">Welcome</p>
        <p>You need to login first so that you can shopping here</p>
      </div>
    </>
  );
}
