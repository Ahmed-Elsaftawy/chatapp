import { pool } from "@/core/connect_db.js";
import { AuthResponse, LoginInputs, RegisterInputs, UserData } from "@/types/auth.js";



export const registerRepo = async (inputs: RegisterInputs): Promise<UserData> => {
    const { email, password, displayName } = inputs;

    const user = await pool.query(
        `INSERT INTO user_credentials(email,display_name,password_hash)
        VALUES($1,$2,$3) RETURNING *`, [email, displayName, password]);
    return user.rows[0]
}

export const checkUser = async (inputs: RegisterInputs) => {
    const { email } = inputs;
    const user = await pool.query(
        `SELECT id FROM user_credentials WHERE email=$1`
        , [email]);
    return user.rows[0]
}

export const loginRepo = async (inputs: LoginInputs): Promise<UserData> => {
    const { email } = inputs;
    const user = await pool.query('SELECT email,id,password_hash FROM user_credentials WHERE email=$1', [email]);
    return user.rows[0];
}
