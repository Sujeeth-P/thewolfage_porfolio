import endwolfImg from '../../assets/endwolf.png';

const WolfLogo = ({ size = 48, className = '' }) => (
  <img
    src={endwolfImg}
    alt="Wolf Logo"
    style={{ width: size, height: size, objectFit: 'contain', display: 'block' }}
    className={className}
  />
);

export default WolfLogo;
