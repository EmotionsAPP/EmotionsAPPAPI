import { genSalt, hash, compare } from 'bcrypt';

const SALT_ROUNDS = 11;

export async function hashPassword( password: string ): Promise<string> {
    let salt = await genSalt( SALT_ROUNDS );
    return await hash( password, salt );
}

export async function verifyPassword( password: string, hash: string ): Promise<boolean> {
    return await compare( password, hash );
}
