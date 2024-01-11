import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    // Verifica se o usuario enviou todos dados necessarios
    if (!email || !password) {
      return res.status(401).json({
        errors: ['Credenciais inválidas'],
      });
    }

    const user = await User.findOne({ where: { email } });

    // Verifica se os dados enviados existem na base de dados
    if (!user) {
      return res.status(401).json({
        errors: ['Usuário não existe'],
      });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Senha inválida'],
      });
    }

    // esta pegando o id do usuario com destructor
    const { id } = user;
    // esta enviando um token para o usuario com base no id e email
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: '7d', // representa quanto dias o token sera valido
    });
    return res.json(token);
  }
}
export default new TokenController();
