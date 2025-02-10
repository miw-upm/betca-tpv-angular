import pkg from '../../package.json';

export const environment = {
  production: true,
  NAME: pkg.name,
  VERSION: pkg.version,
  REST_USER: 'https://betca-tpv-user-latest.onrender.com',
  REST_CORE: 'https://betca-tpv-core-latest.onrender.com',
  REST_CUSTOMER_SUPPORT: 'https://betca-tpv-customer-support.herokuapp.com'
};
