import { Config } from 'config';

export const mintPrice = Config.isDebug ? '0.0000001' : '0.077';
