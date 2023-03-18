import axios from "axios";

export default function Test() {
  tokenCheck();
  return <p>testing route</p>;
}

async function tokenCheck() {
  const token = localStorage.getItem("token");
  console.log(token === "undefined");
  console.log(localStorage.getItem("token"));
  if (!token) {
    console.log(token);
    const response = await axios.get(
      "http://localhost:1000/api/user/refreshToken",
      { withCredentials: true }
    );
    localStorage.setItem("token", response.data.token);
  }
}
