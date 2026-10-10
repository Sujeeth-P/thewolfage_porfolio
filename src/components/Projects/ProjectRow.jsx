import { useState } from 'react';
import { motion } from 'framer-motion';
import useIsMobile from '../../hooks/useIsMobile';

const ProjectRow = ({ project, index }) => {
  const isMobile = useIsMobile();
  const [hovered, setHovered] = useState(false);
  const linked = Boolean(project.url);

  // A real link when the project has a url, otherwise a plain row (no fake pointer/arrow).
  const Row = linked ? motion.a : motion.div;
  const linkProps = linked
    ? { href: project.url, target: '_blank', rel: 'noopener noreferrer', 'aria-label': `${project.title}, view project` }
    : {};

  return (
    <Row
      {...linkProps}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.6, delay: isMobile ? 0 : index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hover={linked ? true : undefined}
      style={{
        borderTop: '1px solid rgba(255,255,255,0.09)',
        padding: isMobile ? '1.5rem 0' : '2.5rem 0',
        display: 'grid',
        gridTemplateColumns: isMobile ? '34px 1fr' : linked ? '60px 1fr auto' : '60px 1fr',
        alignItems: 'center',
        gap: isMobile ? '0.9rem' : '2rem',
        color: 'inherit',
        textDecoration: 'none',
        transition: 'background 0.3s, padding-left 0.3s',
        background: hovered ? 'rgba(232,240,32,0.03)' : 'transparent',
        paddingLeft: hovered && !isMobile ? '1rem' : '0',
      }}
    >
      <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#6d6d6d', fontSize: '0.75rem', letterSpacing: '0.2em' }}>
        0{index + 1}
      </span>

      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <h3 style={{
            fontFamily: "'Bebas Neue', 'Anton', sans-serif",
            fontSize: isMobile ? 'clamp(1.6rem, 7vw, 2.5rem)' : 'clamp(1.8rem, 3.5vw, 3rem)',
            color: hovered ? project.color : '#fff',
            margin: 0, letterSpacing: '0.03em', transition: 'color 0.3s',
          }}>{project.title}</h3>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#7a7a7a', fontSize: '0.75rem' }}>{project.year}</span>
        </div>

        {/* Description is always in the DOM and visible: no content hidden behind hover. */}
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          color: hovered ? '#c4c4c4' : '#9a9a9a',
          fontSize: isMobile ? '0.9rem' : '0.95rem',
          margin: '0.3rem 0 0.9rem', lineHeight: 1.55,
          maxWidth: '60ch', transition: 'color 0.3s',
        }}>
          {project.desc}
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {project.tags.map((t) => (
            <span key={t} style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase',
              padding: '0.25rem 0.7rem',
              border: `1px solid ${hovered ? `${project.color}88` : 'rgba(255,255,255,0.16)'}`,
              color: hovered ? project.color : '#8a8a8a',
              transition: 'all 0.3s',
            }}>{t}</span>
          ))}
        </div>
      </div>

      {linked && !isMobile && (
        <motion.div aria-hidden="true" animate={{ x: hovered ? 0 : 10, opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            border: `1px solid ${project.color}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: project.color, fontSize: '1.2rem',
          }}>→</div>
        </motion.div>
      )}
    </Row>
  );
};

export default ProjectRow;
