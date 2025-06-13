import React, { useEffect } from "react";
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

import CoverPages from "./pages/CoverPages";
import OXQuizPages from "./pages/OXQuizPages";
const App = () => {
  return (
    <Routes>
      <Route path="/CoverPages" element={<CoverPages />} /> {/* 첫페이지 */}
      <Route path="/login" element={<Login />} /> {/* 로그인페이지 */}
      <Route path="/camera" element={<Camera />} /> {/* 사진찍는페이지 */}
      <Route path="/QuzePages" element={<QuzePages />} /> {/*문제객관식*/}
      <Route path="/RankingPages" element={<RankingPages />} /> {/*랭킹페이지*/}
      <Route path="/Result" element={<Result />} /> {/*결과 페이지*/}
      <Route path="/ResultPages" element={<ResultPages />} /> {/*결과 페이지*/}
      <Route path="/SuQuzePages" element={<SuQuzePages />} /> {/*결과 페이지*/}
      <Route path="/Emoticon" element={<Emoticon />} /> {/*결과 페이지*/}
      <Route path="/Emo" element={<EmoticonPages />} /> {/*결과 페이지*/}
      <Route path="/SuQuzePages" element={<SuQuzePages />} /> {/*문제주관식*/}
      <Route path="/OXQuizPages" element={<OXQuizPages />} /> {/*문제 OX*/}
    </Routes>
  );
};

export default App;
