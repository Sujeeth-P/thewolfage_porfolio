import { motion } from 'framer-motion';
import useIsMobile from '../../hooks/useIsMobile';
import WolfLogo from '../common/WolfLogo';
import { SOCIAL_LINKS } from '../../data/constants';

const Contact = ({ openModal }) => {
  const isMobile = useIsMobile();

  return (
    <section
      id="contact"
      style={{
        background: '#080808',
        padding: isMobile ? '5rem 1.25rem 4rem' : '10rem 2.5rem 8rem',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Watermark logo */}
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', opacity: 0.04 }}>
        <WolfLogo size={isMobile ? 200 : 400} />
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#E8F020', fontSize: '0.75rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            [ 05 ] Let's Build
          </p>
          <h2 style={{ fontFamily: "'Bebas Neue', 'Anton', sans-serif", fontSize: 'clamp(3rem, 10vw, 10rem)', color: '#fff', lineHeight: 0.88, margin: '0 0 2rem', letterSpacing: '-0.02em' }}>
            YOUR NEXT<br /><span style={{ color: '#E8F020' }}>PROJECT STARTS HERE.</span>
          </h2>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#666', fontSize: isMobile ? '1rem' : '1.1rem', lineHeight: 1.7, maxWidth: '500px', marginBottom: isMobile ? '2rem' : '3rem' }}>
            Tell us what you're working on. We'll tell you exactly how we can make it exceptional.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={openModal}
              data-hover
              style={{
                padding: '1.1rem 3rem', background: '#E8F020', color: '#080808',
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                fontSize: isMobile ? '0.8rem' : '0.9rem', letterSpacing: '0.15em',
                textTransform: 'uppercase',
                clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
                border: 'none', cursor: 'none',
                width: isMobile ? '100%' : 'auto',
              }}
            >Book a Consultation</button>

            <a
              href="mailto:support@thewolfage.live"
              data-hover
              style={{
                padding: '1.1rem 3rem', background: '#E8F020', color: '#080808',
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                fontSize: isMobile ? '0.8rem' : '0.9rem', letterSpacing: '0.15em',
                textDecoration: 'none', textTransform: 'uppercase',
                clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
                display: 'block', textAlign: 'center',
                width: isMobile ? '100%' : 'auto',
              }}
            >support@thewolfage.live</a>
          </div>

          <div style={{ display: 'flex', gap: isMobile ? '1.25rem' : '2rem', marginTop: isMobile ? '2.5rem' : '4rem', flexWrap: 'wrap' }}>
            {SOCIAL_LINKS.map(link => (
              <a
                key={link}
                href="#"
                data-hover
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.8rem', letterSpacing: '0.15em',
                  textTransform: 'uppercase', color: '#444',
                  textDecoration: 'none', transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => { e.target.style.color = '#E8F020'; }}
                onMouseLeave={(e) => { e.target.style.color = '#444'; }}
              >{link}</a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
