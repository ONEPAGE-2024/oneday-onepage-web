import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import Create from "../pages/Create";
import Diary from "../pages/Diary";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/create" element={<Create />}></Route>
        <Route path="/" element={<Diary />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
