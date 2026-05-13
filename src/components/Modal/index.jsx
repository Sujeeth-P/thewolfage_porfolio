import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FORM_SERVICES } from '../../data/index.jsx';

const INDUSTRIES = [
  'Technology / SaaS',
  'Retail / E-Commerce',
  'Healthcare',
  'Finance / Fintech',
  'Education',
  'Real Estate',
  'Hospitality',
  'Manufacturing',
  'Other',
];

export default function Modal({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [industry, setIndustry] = useState('');
  const [message, setMessage] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add('modal-open');
    } else {
      document.documentElement.classList.remove('modal-open');
    }
    return () => document.documentElement.classList.remove('modal-open');
  }, [isOpen]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const toggleService = (s) =>
    setSelectedServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) {
      setError('Please fill in your name and email to proceed.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    try {
      const response = await fetch(import.meta.env.VITE_APP_SCRIPT, {
        method: 'POST',
        body: JSON.stringify({ name, email, phone, company, industry, services: selectedServices, message }),
      });
      const data = await response.json();
      if (data.success) {
        onSubmit();
      } else {
        setError('Submission failed. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const inputStyle = (field) => ({
    background: '#141414',
    border: `1px solid ${focusedField === field ? '#E8F020' : 'rgba(232,240,32,0.12)'}`,
    borderRadius: 8,
    padding: '12px 16px',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '0.875rem',
    color: '#FAFAF7',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
    caretColor: '#E8F020',
  });

  const labelStyle = {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#666',
    marginBottom: 6,
    display: 'block',
  };

  const modal = (
    <>
      <style>{`
        html.modal-open { overflow: hidden !important; }
        input::placeholder, textarea::placeholder { color: #3a3a3a; }
        select option { background: #141414; color: #FAFAF7; }
        @media (max-width: 540px) {
          .modal-card { padding: 28px 16px 24px !important; }
          .modal-grid { grid-template-columns: 1fr !important; }
          .modal-services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div
        onClick={handleBackdropClick}
        data-lenis-prevent
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '100vw', height: '100vh',
          background: 'rgba(5,5,5,0.82)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          zIndex: 9999,
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          overflowY: 'auto', padding: '20px', boxSizing: 'border-box',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      >
        <div
          className="modal-card"
          onClick={(e) => e.stopPropagation()}
          style={{
            background: '#0E0E0E',
            border: '1px solid rgba(232,240,32,0.1)',
            borderRadius: 20,
            width: '100%', maxWidth: 660,
            padding: '48px 48px 40px',
            position: 'relative', flexShrink: 0,
            transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.98)',
            transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
            boxSizing: 'border-box',
          }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 20, right: 20,
              width: 36, height: 36, borderRadius: '50%',
              background: '#1A1A1A', border: '1px solid rgba(232,240,32,0.12)',
              color: '#888', fontSize: '1rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              lineHeight: 1, transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#E8F020'; e.currentTarget.style.color = '#080808'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#1A1A1A'; e.currentTarget.style.color = '#888'; }}
          >✕</button>

          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.65rem', fontWeight: 700,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#E8F020', marginBottom: 10,
            }}>Let's talk</div>
            <h2 style={{
              fontFamily: "'Bebas Neue', 'Anton', sans-serif",
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              color: '#FAFAF7', letterSpacing: '-0.01em',
              lineHeight: 1, margin: '0 0 10px',
            }}>Book a Consultation</h2>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.875rem', color: '#555', margin: 0, lineHeight: 1.6,
            }}>Tell us about your project and we'll get back to you within 24 hours.</p>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              marginBottom: 20, padding: '10px 16px', borderRadius: 8,
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
              color: '#f87171', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.85rem',
            }}>{error}</div>
          )}

          {/* Form grid */}
          <div className="modal-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={labelStyle}>Name *</label>
              <input type="text" placeholder="Your full name" value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
                style={inputStyle('name')} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={labelStyle}>Email *</label>
              <input type="email" placeholder="you@company.com" value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                style={inputStyle('email')} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={labelStyle}>Phone</label>
              <input type="tel" placeholder="+91 98765 43210" value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onFocus={() => setFocusedField('phone')} onBlur={() => setFocusedField(null)}
                style={inputStyle('phone')} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={labelStyle}>Company Name</label>
              <input type="text" placeholder="Your company" value={company}
                onChange={(e) => setCompany(e.target.value)}
                onFocus={() => setFocusedField('company')} onBlur={() => setFocusedField(null)}
                style={inputStyle('company')} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Industry</label>
              <select value={industry} onChange={(e) => setIndustry(e.target.value)}
                onFocus={() => setFocusedField('industry')} onBlur={() => setFocusedField(null)}
                style={{ ...inputStyle('industry'), cursor: 'pointer' }}>
                <option value="" style={{ background: '#141414' }}>Select your industry</option>
                {INDUSTRIES.map((opt) => (
                  <option key={opt} value={opt} style={{ background: '#141414' }}>{opt}</option>
                ))}
              </select>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Services Needed</label>
              <div className="modal-services-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {FORM_SERVICES.map((svc) => {
                  const checked = selectedServices.includes(svc);
                  return (
                    <div key={svc} onClick={() => toggleService(svc)} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 14px',
                      border: `1px solid ${checked ? '#E8F020' : 'rgba(232,240,32,0.1)'}`,
                      borderRadius: 8,
                      background: checked ? 'rgba(232,240,32,0.07)' : 'transparent',
                      cursor: 'pointer',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '0.82rem',
                      color: checked ? '#E8F020' : '#666',
                      transition: 'all 0.2s', userSelect: 'none', boxSizing: 'border-box',
                    }}>
                      <div style={{
                        width: 16, height: 16, borderRadius: 4,
                        border: `1px solid ${checked ? '#E8F020' : 'rgba(255,255,255,0.2)'}`,
                        background: checked ? '#E8F020' : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, transition: 'all 0.2s',
                      }}>
                        {checked && <span style={{ fontSize: 10, color: '#080808', lineHeight: 1, fontWeight: 700 }}>✓</span>}
                      </div>
                      {svc}
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Message</label>
              <textarea
                placeholder="Tell us about your project, goals, or challenges…"
                value={message} onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)}
                rows={4}
                style={{ ...inputStyle('message'), resize: 'vertical', minHeight: 100, fontFamily: "'Space Grotesk', sans-serif" }}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{
                gridColumn: '1 / -1',
                background: '#E8F020', color: '#080808', border: 'none',
                padding: '16px 32px',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.85rem', fontWeight: 700,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                width: '100%', marginTop: 8,
                clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
                transition: 'opacity 0.2s, transform 0.2s',
                opacity: isSubmitting ? 0.6 : 1,
              }}
              onMouseEnter={(e) => { if (!isSubmitting) { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)'; } }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = isSubmitting ? '0.6' : '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {isSubmitting ? 'Sending…' : 'Submit Request →'}
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(modal, document.body);
}
