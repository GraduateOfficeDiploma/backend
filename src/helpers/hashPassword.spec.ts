import { hashPassword, validatePassword } from './hashPassword';

describe('hashPassword', () => {
  it('hashes new password and validates it', async () => {
    const password = 'verystrongpassomgimvauuuuuu';
    const hashedPassword = await hashPassword(password);
    expect(await validatePassword(password, hashedPassword)).toBeTruthy();
  });
});
