import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import useIsMobile from '../../hooks/useIsMobile';
import { PROJECTS } from '../../data/projects';
import ProjectRow from './ProjectRow';

const Projects = () => {
  const isMobile = useIsMobile();
  const ref = useRef(null);
  const sectionProgress = useMotionValue(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      sectionProgress.set(Math.max(0, Math.min(1, -rect.top / total)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sectionProgress]);

  const pathLength = useTransform(sectionProgress, [0, 1], [0, 1]);

  return (
    <section id="work" ref={ref} style={{ background: '#080808', padding: isMobile ? '5rem 0' : '8rem 0', position: 'relative' }}>
      {!isMobile && (
        <svg
          style={{ position: 'absolute', right: '5%', top: 0, height: '100%', width: '500px', overflow: 'visible', pointerEvents: 'none' }}
          viewBox="0 0 300 2000" fill="none" xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M150 0 C200 200 50 300 150 500 C250 700 100 800 150 1000 C200 1200 50 1300 150 1500 C250 1700 100 1800 150 2000"
            stroke="#e7ef15ff" strokeWidth="6.5" fill="none" strokeDasharray="8 4"
            style={{ pathLength, opacity: 0.25 }}
          />
        </svg>
      )}

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '0 1.25rem' : '0 2.5rem' }}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '5rem' }}
        >
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#E8F020', fontSize: '0.75rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            [ 01 ] Selected Work
          </p>
          <h2 style={{ fontFamily: "'Bebas Neue', 'Anton', sans-serif", fontSize: 'clamp(3.5rem, 7vw, 7rem)', color: '#fff', lineHeight: 0.9, margin: 0, letterSpacing: '-0.01em' }}>
            WORK THAT<br /><span style={{ color: '#E8F020' }}>MOVES MARKETS</span>
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {PROJECTS.map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
