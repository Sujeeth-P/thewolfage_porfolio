import { useState } from 'react';
import { motion } from 'framer-motion';

const ServiceCard = ({ service, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hover
      style={{
        padding: '3rem 2.5rem',
        background: hovered ? 'rgba(232,240,32,0.04)' : '#0e0e0e',
        transition: 'background 0.4s',
        cursor: 'pointer',
      }}
    >
      <div style={{
        fontSize: '2rem', color: '#E8F020', marginBottom: '1.5rem',
        transition: 'transform 0.3s',
        transform: hovered ? 'scale(1.2)' : 'scale(1)',
      }}>{service.icon}</div>
      <h3 style={{ fontFamily: "'Bebas Neue', 'Anton', sans-serif", fontSize: '1.8rem', color: '#fff', margin: '0 0 0.75rem', letterSpacing: '0.05em' }}>
        {service.label}
      </h3>
      <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#666', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
        {service.desc}
      </p>
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        style={{ height: 1, background: '#E8F020', marginTop: '1.5rem', transformOrigin: 'left' }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

export default ServiceCard;
