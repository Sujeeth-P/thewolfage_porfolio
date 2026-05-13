import { useState } from 'react';
import wolfLogo from './assets/wolf.png';

import { NAV_ITEMS } from './data/constants';

import FontImport from './components/common/FontImport';
import SmoothScroll from './components/common/SmoothScroll';
import CustomCursor from './components/common/CustomCursor';
import NoiseOverlay from './components/common/NoiseOverlay';
import Marquee from './components/common/Marquee';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HeroReveal from './components/Hero/HeroReveal';
import Projects from './components/Projects';
import Services from './components/Services';
import ParallaxSection from './components/ParallaxSection';
import Process from './components/Process';
import About from './components/About';
import CrowdSection from './components/CrowdSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Modal from './components/Modal';
import ThankYou from './components/ThankYou';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const openModal  = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const handleSubmit = () => { setModalOpen(false); setSubmitted(true); };
  const handleReturn = () => setSubmitted(false);

  return (
    <>
      <SmoothScroll />
      <FontImport />
      <CustomCursor />
      <NoiseOverlay />

      <Navbar
        logo={wolfLogo}
        logoAlt="TheWolfAge"
        logoHref="#"
        items={NAV_ITEMS}
        baseColor="#000000"
        pillColor="#E8F020"
        pillTextColor="#080808"
        hoveredPillTextColor="#E8F020"
        initialLoadAnimation={false}
        openModal={openModal}
      />

      <main>
        <Hero openModal={openModal} />
        <HeroReveal />
        <Marquee />
        <Projects />
        <Services />
        <ParallaxSection />
        <Process />
        <About />
        <CrowdSection />
        <Contact openModal={openModal} />
      </main>

      <Footer />

      <Modal isOpen={modalOpen} onClose={closeModal} onSubmit={handleSubmit} />

      {submitted && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000 }}>
          <ThankYou onReturn={handleReturn} />
        </div>
      )}
    </>
  );
}
