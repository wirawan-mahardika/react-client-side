import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Beranda from "./pages/Beranda";
import Login from "./pages/Login";
import Shop, { shopSearchAction } from "./components/Shop";
import Detail from "./components/Detail";
import Home from "./components/Home";
import ProtectHome from "./components/ProtectHome";
import Acer, { acerLoaderData } from "./pages/Acer";
import Apple, { appleLoaderData } from "./pages/Apple";
import Asus, { asusLoaderData } from "./pages/Asus";
import Signup from "./pages/Signup";
import Cart from "./components/Cart";
import Profile from "./pages/Profile";
import Test from "./pages/Test";
import Laptop, { laptopLoader } from "./pages/Laptop";
import Users from "./pages/Users";
import Barang, { barangActionData } from "./pages/Barang";
import Handphone, { handphoneLoader } from "./pages/Handphone";
import Errorpage from "./components/Errorpage";
import BarangMenu from "./components/BarangMenu";
import BarangSetting, { BarangLoaderData } from "./components/BarangSetting";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route path="/" element={<Dashboard />} errorElement={<Errorpage />}>
        {/* <Route path="/" element={<Dashboard />}> */}
        <Route path="/" element={<Beranda />}>
          <Route index element={<Home />} />
          <Route path="home" element={<ProtectHome />} />
          <Route path="profile" element={<Profile />} />
          <Route path="cart" element={<Cart />}>
            <Route path="detail" element={<Detail />} />
          </Route>
          <Route path="shop" element={<Shop />} action={shopSearchAction}>
            <Route path="detail" element={<Detail />} />
          </Route>
          <Route path="laptop" element={<Laptop />} loader={laptopLoader}>
            <Route path="detail" element={<Detail />} />
          </Route>
          <Route
            path="handphone"
            element={<Handphone />}
            loader={handphoneLoader}
          >
            <Route path="detail" element={<Detail />} />
          </Route>
          <Route path="acer" element={<Acer />} loader={acerLoaderData}>
            <Route path="detail" element={<Detail />} />
          </Route>
          <Route path="asus" element={<Asus />} loader={asusLoaderData}>
            <Route path="detail" element={<Detail />} />
          </Route>
          <Route path="apple" element={<Apple />} loader={appleLoaderData}>
            <Route path="detail" element={<Detail />} />
          </Route>
          <Route path="users" element={<Users />} />
          <Route path="barang-menu" element={<BarangMenu />} />
          <Route path="barang" element={<Barang />} action={barangActionData} />
          <Route
            path="setting-barang"
            element={<BarangSetting />}
            loader={BarangLoaderData}
          />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="test" element={<Test />} />
      </Route>,
    ])
  );
  return <RouterProvider router={router} />;
}
