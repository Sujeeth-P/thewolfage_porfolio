import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useIsMobile from '../../hooks/useIsMobile';

const ProjectRow = ({ project, index }) => {
  const isMobile = useIsMobile();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hover
      style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: isMobile ? '1.5rem 0' : '2.5rem 0',
        display: 'grid',
        gridTemplateColumns: isMobile ? '36px 1fr' : '60px 1fr auto',
        alignItems: 'center',
        gap: isMobile ? '1rem' : '2rem',
        cursor: 'pointer',
        transition: 'background 0.3s',
        background: hovered ? 'rgba(232,240,32,0.03)' : 'transparent',
        paddingLeft: hovered && !isMobile ? '1rem' : '0',
      }}
    >
      <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#333', fontSize: '0.75rem', letterSpacing: '0.2em' }}>
        0{index + 1}
      </span>

      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <h3 style={{
            fontFamily: "'Bebas Neue', 'Anton', sans-serif",
            fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2.5rem)' : 'clamp(1.8rem, 3.5vw, 3rem)',
            color: hovered ? project.color : '#fff',
            margin: 0, letterSpacing: '0.03em', transition: 'color 0.3s',
          }}>{project.title}</h3>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#444', fontSize: '0.75rem' }}>{project.year}</span>
        </div>

        {isMobile ? (
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#888', fontSize: '0.85rem', margin: '0.3rem 0 0.8rem', lineHeight: 1.5 }}>
            {project.desc}
          </p>
        ) : (
          <AnimatePresence>
            {hovered && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#888', fontSize: '0.9rem', margin: '0.3rem 0 0.8rem', lineHeight: 1.5 }}
              >
                {project.desc}
              </motion.p>
            )}
          </AnimatePresence>
        )}

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {project.tags.map(t => (
            <span key={t} style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase',
              padding: '0.2rem 0.7rem',
              border: `1px solid ${hovered ? project.color + '55' : 'rgba(255,255,255,0.1)'}`,
              color: hovered ? project.color : '#555',
              transition: 'all 0.3s',
            }}>{t}</span>
          ))}
        </div>
      </div>

      {!isMobile && (
        <motion.div animate={{ x: hovered ? 0 : 10, opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            border: `1px solid ${project.color}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: project.color, fontSize: '1.2rem',
          }}>→</div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProjectRow;
