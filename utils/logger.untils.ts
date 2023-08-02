import { pino } from 'pino';

const init = () => pino();

export enum LogTypes {
  INFO = 'info',
  WARNING = 'warning',
  ERROR_LOG = 'error_lohs',
}
const loadLogStructFromEnv = (logEnv: LogTypes) => {
  const { INFO, ERROR_LOG, WARNING } = LogTypes;
  let obj = {};
  const { INFO_LOGS, WARNING_LOGS, ERROR_LOGS } = process.env;
  switch (logEnv) {
    case INFO:
      obj = JSON.parse(INFO_LOGS!);
      break;
    case ERROR_LOG:
      obj = JSON.parse(WARNING_LOGS!);
      break;
    case WARNING:
      obj = JSON.parse(ERROR_LOGS!);
      break;
  }
  return obj;
};

const infoLogs = (msg: any, func: LogTypes) => {
  const logObj = loadLogStructFromEnv(func);
  return init().info(msg);
};

export default infoLogs;
