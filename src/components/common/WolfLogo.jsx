import endwolfImg from '../../assets/endwolf.webp';

// Decorative by default (alt=""). Pass alt when the logo is the only label.
const WolfLogo = ({ size = 48, className = '', alt = '' }) => (
  <img
    src={endwolfImg}
    alt={alt}
    width={size}
    height={size}
    loading="lazy"
    decoding="async"
    style={{ width: size, height: size, objectFit: 'contain', display: 'block' }}
    className={className}
  />
);

export default WolfLogo;
