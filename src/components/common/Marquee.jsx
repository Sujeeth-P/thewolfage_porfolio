import { motion } from 'framer-motion';
import { MARQUEE_ITEMS } from '../../data/constants';

const Marquee = () => (
  <div style={{
    background: '#E8F020', overflow: 'hidden', padding: '0.8rem 0',
    borderTop: '1px solid rgba(0,0,0,0.1)',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
  }}>
    <motion.div
      animate={{ x: ['0%', '-50%'] }}
      transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      style={{ display: 'flex', gap: '2rem', whiteSpace: 'nowrap', width: 'max-content' }}
    >
      {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
        <span key={i} style={{
          fontFamily: "'Bebas Neue', 'Anton', sans-serif",
          fontSize: '1.1rem',
          letterSpacing: '0.2em',
          color: '#080808',
        }}>{item}</span>
      ))}
    </motion.div>
  </div>
);

export default Marquee;
