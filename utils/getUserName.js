export const getUserName = () => {
  return process.argv[2].split("=")[1] ?? 'Who are you?';
};
