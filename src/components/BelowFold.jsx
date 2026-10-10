import { MotionConfig } from 'framer-motion';

import Projects from './Projects';
import Services from './Services';
import ParallaxSection from './ParallaxSection';
import Process from './Process';
import About from './About';
import CrowdSection from './CrowdSection';
import Contact from './Contact';
import RefreshOnMount from './common/RefreshOnMount';

// Everything under the hero and the manifesto reveal lives in this one lazy chunk,
// so framer-motion, the crowd canvas and all section code stay out of the first load.
// reducedMotion="user" makes every framer-motion animation respect the OS setting.
const BelowFold = ({ openModal }) => (
  <MotionConfig reducedMotion="user">
    <Projects />
    <Services />
    <ParallaxSection />
    <Process />
    <About />
    <CrowdSection />
    <Contact openModal={openModal} />
    <RefreshOnMount />
  </MotionConfig>
);

export default BelowFold;
