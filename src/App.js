import React from 'react';
import Introduction from './components/Introduction';
import Services from './components/Services';
import OurProcess from './components/OurProcess';
import AboutUs from './components/AboutUs';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import './styles/main.css';

function App() {
  return (
    <div>
      <Introduction />
      <Services />
      <OurProcess />
      <AboutUs />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;