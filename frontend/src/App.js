import React, { useState } from "react";
import Navbar from "./Layouts/Navbar";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import DefaultLoading from "./Loading/DefaultLoading";
import animationData from "./Animations/404.json";
import AddItem from "./pages/AddItem";
import Footer from "./Layouts/Footer";
import ContactUs from "./pages/ContactUs";

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="h-screen overflow-auto justify-between flex flex-col bg-slate-900">
      <div>
        <Navbar user={user} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/addItem" element={<AddItem />} />
          <Route path="/Contact us" element={<ContactUs />} />
          <Route
            path="*"
            element={<DefaultLoading animationData={animationData} />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
