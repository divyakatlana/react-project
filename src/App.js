import './App.css';
import Header from './components/Header/Header';
import { PrimeReactProvider } from "primereact/api";
import 'primereact/resources/themes/saga-blue/theme.css'; // theme
import 'primereact/resources/primereact.min.css'; // core css
import 'primeicons/primeicons.css'; // icons
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import { ProgressBar } from 'primereact/progressbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieDetails from './components/MovieDetails/MovieDetails';
import { CharacterDetails } from './components/CharacterDetails/CharacterDetails';
import { useLocation, useNavigationType } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


export default function App() {

  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    const handleNavigationStart = () => setLoading(true);
    const handleNavigationEnd = () => setTimeout(() => setLoading(false), 1000);

    handleNavigationStart();
    handleNavigationEnd();

    return () => {
      clearTimeout();
    };
  }, [location]);

  return (
    <PrimeReactProvider>
      {loading && (<ProgressBar mode="indeterminate" className='progressBarStyle'></ProgressBar> )}
      <Header />
        <Routes>
        <Route  path="" element={<Home />} />
          <Route  path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
        </Routes>
      <Footer />
    </PrimeReactProvider>
    
  );
}
