import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body); // esta recebendo os dados enviado pelo cliente(nome, email e senha)
      const { id, nome, email } = novoUser;

      return res.json({ id, nome, email });
    } catch (e) {
      // console.log(e);
      // json(ta enviando um objeto com a chave errors)
      // errors(objeto do json) ta recebendo o erro e ta tratando-o
      // errors(dentro do objeto errors) é um array(com varios objetos) do sequelize que mostra os erros da aplicação
      // map ta fazendo um iteração por todos os objetos dentro do array
      // e exibindo a mensagem que ta dentro
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
        //  |        ↳ esse "errors" é um array do próprio sequelize ***
        //  ↳ esse "errors" é um objeto que eu crie pra mostrar os erros da aplicação e ficar mais nitido para o usuario
      });
    }
  }

  /*

  ** METODOS DO CONTROLLER

  index -> lista todos os usuarios  -> GET
  store/create -> cria um novo usuario -> POST
  delete -> apaga um usuario -> DELETE
  show -> mostra um usuario  -> GET
  update -> atualiza um usuario -> PATCH ou PUT

  */

  // Index
  async index(req, res) { // async await pq esta buscando os dados no BD
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(users);
    } catch (e) {
      return res.json(null); // caso caia no catch é erro do programa não do usuario. enviando um valor null pra não mostra o erro pro usuario
    }
  }

  // Show
  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      const { id, nome, email } = user;

      return res.json({ id, nome, email });
    } catch (e) {
      return res.json(null);
    }
  }

  // Update
  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      const novosDados = await user.update(req.body);
      const { id, nome, email } = novosDados;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
        //  |        ↳ esse "errors" é um array do próprio sequelize ***
        //  ↳ esse "errors" é um objeto que eu crie pra mostrar os erros da aplicação e ficar mais nitido para o usuario
      });
    }
  }

  // Delete

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      await user.destroy();
      return res.json(user);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
