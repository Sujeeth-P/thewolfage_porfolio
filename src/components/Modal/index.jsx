import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FORM_SERVICES } from '../../data/index.jsx';
import { CONTACT_EMAIL } from '../../data/constants';

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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

const initialForm = { name: '', email: '', phone: '', company: '', industry: '', message: '', website: '' };

export default function Modal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const [selectedServices, setSelectedServices] = useState([]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const dialogRef = useRef(null);
  const nameRef = useRef(null);
  const returnFocusRef = useRef(null);

  const setField = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  // Scroll lock + move focus into the dialog on open, restore it on close.
  useEffect(() => {
    if (!isOpen) return undefined;
    returnFocusRef.current = document.activeElement;
    document.documentElement.classList.add('modal-open');
    const t = setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 60);
    return () => {
      clearTimeout(t);
      document.documentElement.classList.remove('modal-open');
      returnFocusRef.current?.focus?.({ preventScroll: true });
    };
  }, [isOpen]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }
    if (e.key !== 'Tab') return;
    const nodes = dialogRef.current?.querySelectorAll(FOCUSABLE);
    if (!nodes?.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, [onClose]);

  const toggleService = (s) =>
    setSelectedServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!form.name.trim()) {
      setError('Please tell us your name.');
      return;
    }
    if (!EMAIL_RE.test(form.email.trim())) {
      setError('Please enter a valid email address so we can reply.');
      return;
    }

    // Honeypot: real people never see or fill this field.
    if (form.website) {
      setForm(initialForm);
      onSubmit();
      return;
    }

    const endpoint = import.meta.env.VITE_APP_SCRIPT;
    if (!endpoint) {
      setError(`The form isn't connected yet. Please email us at ${CONTACT_EMAIL}.`);
      return;
    }

    setError('');
    setIsSubmitting(true);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    try {
      const { website: _honeypot, ...fields } = form;
      const response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({ ...fields, services: selectedServices }),
        signal: controller.signal,
      });
      const data = await response.json();
      if (data.success) {
        setForm(initialForm);
        setSelectedServices([]);
        onSubmit();
      } else {
        setError('Submission failed. Please try again.');
      }
    } catch {
      setError(`Something went wrong. Please try again, or email ${CONTACT_EMAIL}.`);
    } finally {
      clearTimeout(timer);
      setIsSubmitting(false);
    }
  };

  const inputStyle = (field) => ({
    background: '#141414',
    border: `1px solid ${focusedField === field ? '#E8F020' : 'rgba(232,240,32,0.22)'}`,
    borderRadius: 8,
    padding: '13px 16px',
    minHeight: 48,
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '1rem', // 16px: anything smaller makes iOS Safari zoom the page on focus
    color: '#FAFAF7',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
    caretColor: '#E8F020',
    appearance: 'none',
    WebkitAppearance: 'none',
  });

  const labelStyle = {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '0.72rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#9a9a9a',
    marginBottom: 6,
    display: 'block',
  };

  const fieldProps = (id) => ({
    id: `enq-${id}`,
    onFocus: () => setFocusedField(id),
    onBlur: () => setFocusedField(null),
    style: inputStyle(id),
  });

  const modal = (
    <>
      <style>{`
        html.modal-open { overflow: hidden !important; }
        .enq-input::placeholder, .enq-textarea::placeholder { color: #6a6a6a; }
        .enq-select option { background: #141414; color: #FAFAF7; }
        .enq-overlay { background: rgba(5,5,5,0.94); }
        @media (min-width: 768px) {
          .enq-overlay { background: rgba(5,5,5,0.82); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }
        }
        @media (max-width: 540px) {
          .enq-overlay { padding: 0 !important; align-items: stretch !important; }
          .enq-card { border-radius: 0 !important; border-left: 0 !important; border-right: 0 !important; padding: 64px 18px calc(28px + env(safe-area-inset-bottom)) !important; min-height: 100%; }
          .enq-grid { grid-template-columns: 1fr !important; }
          .enq-services { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div
        className="enq-overlay"
        data-lenis-prevent
        inert={!isOpen}
        aria-hidden={!isOpen}
        onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
        style={{
          position: 'fixed', inset: 0,
          zIndex: 9999,
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          overflowY: 'auto', overscrollBehavior: 'contain',
          padding: '20px', boxSizing: 'border-box',
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
          transition: `opacity 0.3s ease, visibility 0s linear ${isOpen ? '0s' : '0.3s'}`,
        }}
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="enq-title"
          className="enq-card"
          onKeyDown={handleKeyDown}
          style={{
            background: '#0E0E0E',
            border: '1px solid rgba(232,240,32,0.14)',
            borderRadius: 20,
            width: '100%', maxWidth: 660,
            padding: '48px 48px 40px',
            position: 'relative', flexShrink: 0,
            transform: isOpen ? 'translate3d(0,0,0)' : 'translate3d(0,24px,0)',
            transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
            boxSizing: 'border-box',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close form"
            style={{
              position: 'absolute', top: 12, right: 12,
              width: 44, height: 44, borderRadius: '50%',
              background: '#1A1A1A', border: '1px solid rgba(232,240,32,0.2)',
              color: '#bbb', fontSize: '1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              lineHeight: 1,
            }}
          ><span aria-hidden="true">✕</span></button>

          <div style={{ marginBottom: 28 }}>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.68rem', fontWeight: 700,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#E8F020', marginBottom: 10,
            }}>Let&apos;s talk</div>
            <h2 id="enq-title" style={{
              fontFamily: "'Bebas Neue', 'Anton', sans-serif",
              fontSize: 'clamp(2rem, 6vw, 2.6rem)',
              color: '#FAFAF7', letterSpacing: '-0.01em',
              lineHeight: 1, margin: '0 0 10px', fontWeight: 400,
            }}>Book a Consultation</h2>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.92rem', color: '#9a9a9a', margin: 0, lineHeight: 1.6,
            }}>Tell us about your project and we&apos;ll get back to you within 24 hours.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div role="alert" aria-live="assertive">
              {error && (
                <div id="enq-error" style={{
                  marginBottom: 20, padding: '12px 16px', borderRadius: 8,
                  background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.35)',
                  color: '#fca5a5', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.9rem',
                }}>{error}</div>
              )}
            </div>

            <div className="enq-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="enq-name" style={labelStyle}>Name *</label>
                <input
                  {...fieldProps('name')} ref={nameRef} className="enq-input"
                  type="text" name="name" autoComplete="name" required
                  placeholder="Your full name" value={form.name} onChange={setField('name')}
                  aria-invalid={error.toLowerCase().includes('name') || undefined}
                  aria-describedby={error ? 'enq-error' : undefined}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="enq-email" style={labelStyle}>Email *</label>
                <input
                  {...fieldProps('email')} className="enq-input"
                  type="email" name="email" autoComplete="email" inputMode="email" required
                  autoCapitalize="none" spellCheck={false}
                  placeholder="you@company.com" value={form.email} onChange={setField('email')}
                  aria-invalid={error.toLowerCase().includes('email') || undefined}
                  aria-describedby={error ? 'enq-error' : undefined}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="enq-phone" style={labelStyle}>Phone</label>
                <input
                  {...fieldProps('phone')} className="enq-input"
                  type="tel" name="phone" autoComplete="tel" inputMode="tel"
                  placeholder="+91 98765 43210" value={form.phone} onChange={setField('phone')}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="enq-company" style={labelStyle}>Company name</label>
                <input
                  {...fieldProps('company')} className="enq-input"
                  type="text" name="company" autoComplete="organization"
                  placeholder="Your company" value={form.company} onChange={setField('company')}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
                <label htmlFor="enq-industry" style={labelStyle}>Industry</label>
                <select
                  {...fieldProps('industry')} className="enq-select"
                  name="industry" value={form.industry} onChange={setField('industry')}
                  style={{ ...inputStyle('industry'), color: form.industry ? '#FAFAF7' : '#8a8a8a' }}
                >
                  <option value="">Select your industry</option>
                  {INDUSTRIES.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>

              <fieldset style={{ gridColumn: '1 / -1', border: 0, margin: 0, padding: 0, minWidth: 0 }}>
                <legend style={{ ...labelStyle, padding: 0 }}>Services needed</legend>
                <div className="enq-services" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {FORM_SERVICES.map((svc) => {
                    const checked = selectedServices.includes(svc);
                    return (
                      <button
                        type="button"
                        key={svc}
                        aria-pressed={checked}
                        onClick={() => toggleService(svc)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left',
                          minHeight: 48, padding: '10px 14px',
                          border: `1px solid ${checked ? '#E8F020' : 'rgba(232,240,32,0.22)'}`,
                          borderRadius: 8,
                          background: checked ? 'rgba(232,240,32,0.08)' : 'transparent',
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: '0.9rem',
                          color: checked ? '#E8F020' : '#b0b0b0',
                          transition: 'border-color 0.2s, background 0.2s, color 0.2s',
                          boxSizing: 'border-box', touchAction: 'manipulation',
                        }}
                      >
                        <span aria-hidden="true" style={{
                          width: 18, height: 18, borderRadius: 4,
                          border: `1px solid ${checked ? '#E8F020' : 'rgba(255,255,255,0.3)'}`,
                          background: checked ? '#E8F020' : 'transparent',
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          {checked && <span style={{ fontSize: 11, color: '#080808', lineHeight: 1, fontWeight: 700 }}>✓</span>}
                        </span>
                        {svc}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
                <label htmlFor="enq-message" style={labelStyle}>Message</label>
                <textarea
                  {...fieldProps('message')} className="enq-textarea"
                  name="message" rows={4}
                  placeholder="Tell us about your project, goals, or challenges…"
                  value={form.message} onChange={setField('message')}
                  style={{ ...inputStyle('message'), resize: 'vertical', minHeight: 110 }}
                />
              </div>

              {/* Honeypot: hidden from people and assistive tech */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
                <label htmlFor="enq-website">Website</label>
                <input id="enq-website" type="text" name="website" tabIndex={-1} autoComplete="off"
                  value={form.website} onChange={setField('website')} />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn--primary"
                style={{ gridColumn: '1 / -1', width: '100%', marginTop: 8, opacity: isSubmitting ? 0.6 : 1 }}
              >
                {isSubmitting ? 'Sending…' : 'Submit Request →'}
              </button>

              <p style={{
                gridColumn: '1 / -1', margin: 0, textAlign: 'center',
                fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.78rem', color: '#8a8a8a', lineHeight: 1.5,
              }}>
                We only use your details to reply to this enquiry. No spam, ever.
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );

  return createPortal(modal, document.body);
}
