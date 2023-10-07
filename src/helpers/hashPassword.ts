'use strict';

import * as crypto from 'crypto';

const serializeHash = (hash: Buffer, salt: Buffer, params): string => {
  const paramString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join(',');
  const saltString = salt.toString('base64').split('=')[0];
  const hashString = hash.toString('base64').split('=')[0];
  return `$scrypt$${paramString}$${saltString}$${hashString}`;
};

const deserializeHash = (phcString: string) => {
  const parsed = phcString.split('$');
  parsed.shift();
  if (parsed[0] !== 'scrypt') {
    throw new Error('Node.js crypto module only supports scrypt');
  }
  const params = {};
  parsed[1].split(',').forEach((p) => {
    const kv = p.split('=');
    params[kv[0]] = Number(kv[1]);
  });
  const salt = Buffer.from(parsed[2], 'base64');
  const hash = Buffer.from(parsed[3], 'base64');
  return { params, salt, hash };
};

const SALT_LEN = 32;
const KEY_LEN = 64;

const SCRYPT_PARAMS = {
  N: 32768,
  r: 8,
  p: 1,
  maxmem: 64 * 1024 * 1024,
};

const hashPassword = (password: string): Promise<string> =>
  new Promise((resolve, reject) => {
    crypto.randomBytes(SALT_LEN, (err, salt) => {
      if (err) {
        reject(err);
        return;
      }
      crypto.scrypt(password, salt, KEY_LEN, SCRYPT_PARAMS, (err, hash) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(serializeHash(hash, salt, SCRYPT_PARAMS));
      });
    });
  });

let defaultHash;
hashPassword('').then((hash) => {
  defaultHash = hash;
});

const validatePassword = (password, hash = defaultHash) =>
  new Promise((resolve, reject) => {
    const parsedHash = deserializeHash(hash);
    const len = parsedHash.hash.length;
    crypto.scrypt(
      password,
      parsedHash.salt,
      len,
      parsedHash.params,
      (err, hashedPassword) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(crypto.timingSafeEqual(hashedPassword, parsedHash.hash));
      },
    );
  });

export { hashPassword, validatePassword };
