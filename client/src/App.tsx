import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { useAppDispatch } from "./hooks/reduxHooks";
import { reauthUser } from "./store/thunks/authThunk";

import RequireAuth from "./hocs/requiredAuth";
import Mainpage from "./pages/Mainpage";
import Loginpage from "./pages/Loginpage";

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

      <Route element={<Loginpage />} path="/login" />
    </Routes>
  );
}

export default App;
