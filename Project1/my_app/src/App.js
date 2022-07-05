import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Profile from "./pages/PrefecturePopulationPage/Profile";
import Login from "./pages/LoginPage/Login";
import RequireApiClient from "./RequireApiClient";

function App() {
  const [apiKey, setApiKey] = useState("");

  function onChangeApiKey(newApiKey) {
    setApiKey(newApiKey);
  }

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={<Login changeApiKey={onChangeApiKey} />}
        ></Route>
        <Route
          exact
          path="/profile"
          element={
            <RequireApiClient apiKey={apiKey}>
              <Profile apiKey={apiKey} />
            </RequireApiClient>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
