/**
 * Returs TRUE if we are in a mock env
 */
export const isMock = (): boolean => process.env.REACT_APP_MOCK === 'true';
