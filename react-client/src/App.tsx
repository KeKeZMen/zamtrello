import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { useAppDispatch } from "./hooks/reduxHooks";
import { reauthUser } from "./store/thunks/authThunk";

import RequireAuth from "./hocs/requiredAuth";
import Mainpage from "./pages/Mainpage";
import Loginpage from "./pages/Loginpage";
import Registerpage from "./pages/Registerpage";
import Boardpage from "./pages/Boardpage";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) dispatch(reauthUser());
  }, []);

  return (
    <Routes>
      <Route
        element={
          <RequireAuth>
            <Mainpage />
          </RequireAuth>
        }
        path="/"
      />

      <Route
        element={
          <RequireAuth>
            <Boardpage />
          </RequireAuth>
        }
        path="/board/:id"
      />

      <Route element={<Loginpage />} path="/login" />

      <Route element={<Registerpage />} path="/register" />
    </Routes>
  );
}

export default App;
