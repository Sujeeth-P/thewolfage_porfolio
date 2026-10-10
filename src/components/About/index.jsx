import { motion } from 'framer-motion';
import useIsMobile from '../../hooks/useIsMobile';
import { ABOUT_STATS } from '../../data/constants';

const MANIFESTO = "WE DON'T BUILD FOR MEDIOCRITY. THE BRANDS THAT LEAD DON'T SETTLE FOR AVERAGE DIGITAL. NEITHER DO WE.";

const About = () => {
  const isMobile = useIsMobile();
  const words = MANIFESTO.split(' ');

  return (
    <section style={{ background: '#E8F020', padding: isMobile ? '4rem 1.25rem' : '8rem 2.5rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              style={{
                fontFamily: "'Bebas Neue', 'Anton', sans-serif",
                fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                color: '#080808', lineHeight: 0.95, letterSpacing: '-0.01em',
              }}
            >{word}</motion.span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: isMobile ? '2rem' : '4rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: isMobile ? '1.5rem' : '3rem',
          }}
        >
          {ABOUT_STATS.map(([num, label], i) => (
            <div key={i}>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '4rem', color: '#080808', margin: 0, lineHeight: 1 }}>{num}</p>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.9rem', color: '#333', margin: 0, letterSpacing: '0.1em' }}>{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
