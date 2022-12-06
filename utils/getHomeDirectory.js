import { homedir } from 'os';

export const getHomeDirectory = () => {
  return homedir().trim();
};
