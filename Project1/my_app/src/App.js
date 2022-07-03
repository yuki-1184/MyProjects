import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Profile from "./pages/PrefecturePopulationPage/Profile";
import Login from "./pages/LoginPage/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <RequireApiClient>
              <Profile />
            </RequireApiClient>
          }
        ></Route>
        <Route exact path="/apikey" element={<Login />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
