import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { useAppDispatch } from "./hooks/reduxHooks";
import { reauthUser } from "./store/thunks/authThunk";

import RequireAuth from "./hocs/requiredAuth";
const Mainpage = lazy(() => import("./pages/Mainpage"));
const Boardpage = lazy(() => import("./pages/Boardpage"));
import Loginpage from "./pages/Loginpage";
import Registerpage from "./pages/Registerpage";

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
            <Suspense>
              <Mainpage />
            </Suspense>
          </RequireAuth>
        }
        path="/"
      />

      <Route
        element={
          <RequireAuth>
            <Suspense>
              <Boardpage />
            </Suspense>
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
