import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Players from "./pages/players";
import Attendance from "./pages/Attendance";
import Training from "./pages/Training";
import Matches from "./pages/Matches";
import Statistics from "./pages/Statistics";
import Settings from "./pages/settings";

function App() {
  return (
    <BrowserRouter>

      <div className="app">

        <Sidebar />

        <div className="main-content">

          <Header />

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/players"
              element={<Players />}
            />

            <Route
              path="/attendance"
              element={<Attendance />}
            />

            <Route
  path="/training"
  element={<Training />}
/>

<Route path="/matches" element={<Matches />} />

<Route path="/statistics" element={<Statistics />} />

<Route path="/settings" element={<Settings />} />

          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;