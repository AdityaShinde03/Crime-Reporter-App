import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import ShowMap from './pages/ShowMap';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ReportForm from './components/SubmitForm';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/show-map" element={<ShowMap/>}/>
          <Route path="/submit-report" element={<ReportForm/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
