import { lazy, Suspense, useState } from 'react';
import wolfLogo from './assets/wolf.webp';

import { NAV_ITEMS } from './data/constants';
import useIdleReady from './hooks/useIdleReady';

import SmoothScroll from './components/common/SmoothScroll';
import CustomCursor from './components/common/CustomCursor';
import NoiseOverlay from './components/common/NoiseOverlay';
import StickyCTA from './components/common/StickyCTA';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HeroReveal from './components/Hero/HeroReveal';
import Modal from './components/Modal';
import ThankYou from './components/ThankYou';

// Everything below the first screens is one lazy chunk, mounted after the hero
// has painted (see useIdleReady), which keeps the initial JavaScript small.
const BelowFold = lazy(() => import('./components/BelowFold'));
const Footer = lazy(() => import('./components/Footer'));

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const belowFoldReady = useIdleReady();

  const openModal  = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const handleSubmit = () => { setModalOpen(false); setSubmitted(true); };
  const handleReturn = () => setSubmitted(false);

  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <NoiseOverlay />

      <Navbar
        logo={wolfLogo}
        logoAlt="The Wolf Age"
        logoHref="#top"
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

        {belowFoldReady && (
          <Suspense fallback={null}>
            <BelowFold openModal={openModal} />
          </Suspense>
        )}
      </main>

      {belowFoldReady && (
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      )}

      <StickyCTA onClick={openModal} hidden={modalOpen || submitted} />

      <Modal isOpen={modalOpen} onClose={closeModal} onSubmit={handleSubmit} />

      {submitted && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, overflowY: 'auto', background: '#080808' }}>
          <ThankYou onReturn={handleReturn} />
        </div>
      )}
    </>
  );
}
