import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "./redux/slices/usersSlice";
import { useEffect } from "react";
import Profile from "./pages/Profile";
import OtherProfile from "./pages/OtherProfile";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const keepLogin = () => {
    const data = localStorage.getItem("sosmed_app");
    const user = JSON.parse(data);

    if (data) {
      dispatch(loginAction(user));
    }
  };

  useEffect(() => {
    keepLogin();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        {!user.id ? (
          <>
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />{" "}
          </>
        ) : null}

        {user.id ? <Route element={<Profile />} path="/profile" /> : null}
        <Route element={<Home />} path="/" />

        <Route element={<OtherProfile />} path="/profile/:id" />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </>
  );
}

export default App;
