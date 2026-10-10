import { SERVICES } from './services';

// The enquiry form offers what the Services section actually sells,
// plus two catch-alls. Add or remove entries here.
export const FORM_SERVICES = [
  ...SERVICES.map((service) => service.label),
  'UI/UX Design',
  'Performance Audit',
  'Something else',
];
