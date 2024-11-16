import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Authen/Login";
import Register from "../pages/Authen/Register";

export default function AppRouter() {
  const paths = {
    REGISTER: "/register",
    HOME: "/home",
    LOGIN: "/login",
    PROFILE: "/profile",
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
