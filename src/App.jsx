import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import NewRoutes from "./routes/NewRouts"; // Ensure the correct path

export default function App() {
  return (
    <Router>
      <Navbar />
      <NewRoutes />
    </Router>
  );
}
