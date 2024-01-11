import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.json({
      errors: ['Login required'],
    });
  }

  const [, token] = authorization.split(' '); //  ta separando o token a partir do espaço e jogando a segunda parte na chave token do array

  // exemplo token: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.....

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    const user = await User.findOne({ // verifica se o email do payload do token do usuario bate com a do BD
      where: {
        id,
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        errors: ['Usuário inválido'],
      });
    }

    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (error) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido'],
    });
  }
};
