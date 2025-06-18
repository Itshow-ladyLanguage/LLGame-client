import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Camera from "./pages/Camera";
import QuzePages from "./pages/QuzePages";
import RankingPages from "./pages/RankingPages";
import ResultPages from "./pages/ResultPages";
import Result from "./components/Result";
import SuQuzePages from "./pages/SuQuzePages";
import Emoticon from "./components/Emoticon";
import EmoticonPages from "./pages/EmoticonPages";
import LoadImageFromFirebase from "./pages/LoadImageFromFirebase";
import CoverPages from "./pages/CoverPages";
import OXQuizPages from "./pages/OXQuizPages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<CoverPages />} />
      <Route path="/CoverPages" element={<CoverPages />} />
      <Route path="/login" element={<Login />} />
      <Route path="/camera" element={<Camera />} />
      <Route path="/QuzePages" element={<QuzePages />} />
      <Route path="/RankingPages" element={<RankingPages />} />
      <Route path="/Result" element={<Result />} />
      <Route path="/ResultPages" element={<ResultPages />} />
      <Route path="/SuQuzePages" element={<SuQuzePages />} />
      <Route path="/Emoticon" element={<Emoticon />} />
      <Route path="/Emo" element={<EmoticonPages />} />
      <Route path="/OXQuizPages" element={<OXQuizPages />} />
      <Route path="/Up" element={<LoadImageFromFirebase />} />
    </Routes>
  );
};

export default App;
