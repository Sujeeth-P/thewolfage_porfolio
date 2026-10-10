import { motion } from 'framer-motion';
import useIsMobile from '../../hooks/useIsMobile';
import WolfLogo from '../common/WolfLogo';
import {
  CONTACT_EMAIL,
  SOCIAL_LINKS,
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGE,
} from '../../data/constants';

const Contact = ({ openModal }) => {
  const isMobile = useIsMobile();
  const whatsappHref = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
    : '';
  // Only show social links that actually point somewhere (no dead "#" links).
  const socials = SOCIAL_LINKS.filter((link) => link.href);

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      style={{
        background: '#080808',
        padding: isMobile ? '5rem 1.25rem 4rem' : '10rem 2.5rem 8rem',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Watermark logo */}
      <div aria-hidden="true" style={{ position: 'absolute', bottom: '6%', right: '-4%', opacity: 0.04, pointerEvents: 'none' }}>
        <WolfLogo size={isMobile ? 220 : 400} />
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#E8F020', fontSize: '0.75rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            [ 06 ] Let&apos;s Build
          </p>
          <h2 id="contact-title" style={{ fontFamily: "'Bebas Neue', 'Anton', sans-serif", fontSize: 'clamp(3rem, 10vw, 10rem)', color: '#fff', lineHeight: 0.88, margin: '0 0 2rem', letterSpacing: '-0.02em' }}>
            YOUR NEXT<br /><span style={{ color: '#E8F020' }}>PROJECT STARTS HERE.</span>
          </h2>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#a0a0a0', fontSize: isMobile ? '1rem' : '1.1rem', lineHeight: 1.7, maxWidth: '520px', margin: `0 0 ${isMobile ? '2rem' : '3rem'}` }}>
            Tell us what you&apos;re working on. We&apos;ll tell you exactly how we can make it exceptional, and we reply within 24 hours.
          </p>

          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', flexDirection: isMobile ? 'column' : 'row' }}>
            <button type="button" className="btn btn--primary" data-hover onClick={openModal}>
              Book a Consultation
            </button>

            {whatsappHref && (
              <a className="btn btn--wa" data-hover href={whatsappHref} target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            )}

            <a className="btn btn--ghost" data-hover href={`mailto:${CONTACT_EMAIL}`}>
              Email Us
            </a>
          </div>

          <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#8a8a8a', fontSize: '0.9rem', marginTop: '1.5rem' }}>
            Or write to{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: '#E8F020', textDecoration: 'underline', textUnderlineOffset: '3px', overflowWrap: 'anywhere' }}>
              {CONTACT_EMAIL}
            </a>
          </p>

          {socials.length > 0 && (
            <ul style={{ listStyle: 'none', margin: isMobile ? '2.5rem 0 0' : '4rem 0 0', padding: 0, display: 'flex', gap: isMobile ? '0.25rem 1.5rem' : '0.25rem 2rem', flexWrap: 'wrap' }}>
              {socials.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-hover
                    style={{
                      display: 'inline-flex', alignItems: 'center', minHeight: 44,
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '0.8rem', letterSpacing: '0.15em',
                      textTransform: 'uppercase', color: '#9a9a9a',
                      textDecoration: 'none',
                    }}
                  >{link.label}</a>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
