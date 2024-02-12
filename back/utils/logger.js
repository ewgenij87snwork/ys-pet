const winston = require('winston');

let instance;
const loggerTransports = [];

const init = config => {
  const defaultConsoleOptions = {
    level: 'info',
    json: true,
    type: 'json',
    stringify: options => JSON.stringify(options),
    timestamp: true,
    colorize: true,
  };
  Object.assign(defaultConsoleOptions, config || {});
  loggerTransports.push(new winston.transports.Console(defaultConsoleOptions));

  instance = winston.createLogger({
    transports: loggerTransports,
    exitOnError: false,
  });
};

const initLoggerWithContext = ctx => {
  if (!instance) init();

  const buildLogger = ctx =>
    Object.keys(instance.levels).reduce((accum, key) => {
      accum[key] = (msg, meta = {}) => instance.log(key, msg, Object.assign(meta, { ctx }));
      return accum;
    }, {});
  return buildLogger(ctx);
};

module.exports = {
  init: config => {
    if (!instance) init(config);
    return instance;
  },

  initLoggerWithContext,
};
