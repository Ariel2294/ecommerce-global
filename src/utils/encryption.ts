import * as bcrypt from 'bcrypt';
export const encryptionPassword = async (password: string) => {
  const saltOrRounds = 10;
  const hash = await bcrypt.hash(password, saltOrRounds);
  return hash;
};

export const passwordValidation = (password: string, hash: string) => {
  const isMatch = bcrypt.compare(password, hash);
  return isMatch;
};
