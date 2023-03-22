import bcrypt from "bcryptjs";

function bcryptGenSalt(intensity: number) {
  return new Promise<string>((resolve, reject) => {
    bcrypt.genSalt(intensity, (err, salt) => {
      if (err) {
        reject(err);
      } else {
        resolve(salt);
      }
    });
  });
}

function bcryptHash({ password, salt }: { password: string; salt: string | number }): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
}

export function validatePassword({ passwordInput, passwordHashed }: { passwordInput: string; passwordHashed: string }) {
  return new Promise<boolean>((resolve, reject) => {
    bcrypt.compare(passwordInput, passwordHashed, (err, success) => {
      if (err) {
        reject(err);
      } else {
        resolve(success);
      }
    });
  });
}

export async function createHashedPassword({ password, intensity = 10 }: { password: string; intensity?: number }) {
  const salt = await bcryptGenSalt(intensity);
  return await bcryptHash({ password, salt });
}
