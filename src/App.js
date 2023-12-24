import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Customer from "./Pages/Customer";
import Dashboard from "./Pages/Dashboard";
import ResponsiveDrawer from "./Components/SideBar";

function App() {
  return (
    <Router>
      <ResponsiveDrawer>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customer" element={<Customer />} />
        </Routes>
      </ResponsiveDrawer>
    </Router>
  );
}

export default App;
