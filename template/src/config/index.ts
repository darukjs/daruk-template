import defaultConfig from './config.default';

const env = process.env.NODE_ENV;
const envConfig = require(`./config.${env}`).default;

export default () => {
  return {
    ...defaultConfig,
    ...envConfig
  };
};
