import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Authen/Login";
import Dashboard from "../pages/Dashboard";
import {paths} from "./path"
import Register from "../pages/Authen/Register";
import TestScreen from "../pages/Test/TestScreen";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path={paths.LOGIN} element={<Login />} />
        <Route path={paths.REGISTER} element={<Register />} />
        <Route path={paths.TESTSCREEN} element={<TestScreen />} />
      </Routes>
    </Router>
  );
}
