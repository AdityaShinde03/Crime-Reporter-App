import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
