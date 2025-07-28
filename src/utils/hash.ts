import bcrypt from 'bcryptjs';

export const hashPassword = async (plain: string) => {
    const salt = await bcrypt.genSalt(10); // generate a random salt - complex = 10
    return await bcrypt.hash(plain, salt); // encrypt root pass + salt -> new pass (hashed)
}

export const comparePassword = async (plain: string, hashed: string) => {
    return await bcrypt.compare(plain, hashed);
};