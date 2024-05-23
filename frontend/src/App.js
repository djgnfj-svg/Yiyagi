import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main_Page from "./pages/Main_Page";
import Chat_Page from "./pages/Chat_Page";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main_Page />} />
          <Route path="/chat" element={<Chat_Page />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;