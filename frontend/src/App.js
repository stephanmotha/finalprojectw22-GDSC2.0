import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";
import axios from "axios";
import Initial from "./components/application/Initial/Initial";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentForm from "./components/application/forms/StudentForm";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element />
          <Route path="/projects" element />
          <Route path="/resources" element />
          <Route path="/events" element />
          <Route path="/portal" element={<Initial />} />
          <Route path="/portal/form" element={<StudentForm />} />
          <Route path="/team" element />
          <Route path="/subscribe" element />
        </Routes>
      </Router>
    </>
  );
};

export default App;
