import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css' 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Booking from './components/Booking'
import CheckBooking from './components/CheckBooking'
import Home from './components/Home'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/checkBooking" element={<CheckBooking />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

