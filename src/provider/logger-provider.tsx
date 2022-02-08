import { Config } from 'config';
import pino from 'pino';
import { isNil } from 'ramda';
import React from 'react';

abstract class LoggerWrapper {
  protected _instance: any;
  abstract getInstance(): pino.Logger;
}

export class PinoWrapper extends LoggerWrapper {
  public getInstance(): pino.Logger {
    if (isNil(this._instance)) {
      this._instance = pino({ level: process.env.REACT_LOG_LEVEL ?? this.inferDefaultLogLevel() });
    }
    return this._instance;
  }

  private inferDefaultLogLevel(): string {
    if (!Config.isDebug) {
      return 'info';
    }

    return 'debug';
  }
}

const loggerContext = React.createContext<LoggerWrapper | undefined>(undefined);

interface Props {
  value: LoggerWrapper;
}

export const LoggerProvider: React.FunctionComponent<Props> = ({ value, children }) => {
  return <loggerContext.Provider value={value}>{children}</loggerContext.Provider>;
};

export const useLogger = (): pino.Logger => {
  const loggerWrapper = React.useContext(loggerContext);
  if (!loggerWrapper) {
    throw new Error('useLogger must be used within LoggerProvider.');
  }
  return loggerWrapper.getInstance();
};
