import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutBook from './components/AboutBook';
import PurchaseLinks from './components/PurchaseLinks';
import AboutAuthor from './components/AboutAuthor';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-abyss" data-testid="app-root">
      <Header />
      <main>
        <Hero />
        <AboutBook />
        <PurchaseLinks />
        <AboutAuthor />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

export default App;
