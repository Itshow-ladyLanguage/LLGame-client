import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} /> {/* 로그인 페이지 */}
    </Routes>
  );
};

export default App;
