import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Authentication from './pages/authentication/Authentication';
import HomePage from './pages/HomePage/HomePage';
import { Route, Routes } from 'react-router-dom';
import { getProfileAction } from './Redux/Auth/auth.action';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useSelector(store => store);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt && !auth.user) {
      dispatch(getProfileAction(jwt));
    }
  }, [jwt, auth.user, dispatch]);

  // Chỉ redirect từ auth pages khi đã login thành công
  useEffect(() => {
    if (auth.user && (location.pathname === '/login' || location.pathname === '/register')) {
      navigate('/', { replace: true });
    }
  }, [auth.user, location.pathname, navigate]);

  console.log("Auth state:", auth);

  // Hiển thị HomePage nếu có JWT (đang loading) hoặc có user
  if (jwt || auth.user) {
    return (
      <div className="App">
        <HomePage />
      </div>
    );
  }

  // Chưa login - hiển thị Authentication
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Authentication />} />
        <Route path="/register" element={<Authentication />} />
        <Route path="*" element={<Authentication />} />
      </Routes>
    </div>
  );
}

export default App;