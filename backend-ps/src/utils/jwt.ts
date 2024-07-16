
import jwt from 'jsonwebtoken'
const secretKey : string = "H2O+CaCO3"

export const generateToken = (payload: object, expiresIn: string | number = '5m') => {
    return jwt.sign(payload, secretKey, { expiresIn });
  };

  export const verifyToken = (token: string) => {
    try {
      return jwt.verify(token, secretKey);
    } catch (error) {
      throw new Error('Invalid token');
    }
  };
  