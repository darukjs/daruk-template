import defaultConfig from './config.default';

const env = process.env.NODE_ENV || 'dev';
// @ts-ignore
// tslint:disable-next-line
const envConfig = require(`./config.${env}`).default;

export default () => {
  return {
    ...defaultConfig,
    ...envConfig
  };
};
