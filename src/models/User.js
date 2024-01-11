import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';
/* pesquisar sobre bcryptjs */

export default class User extends Model {
  static init(sequelize) {
    super.init({

      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo nome deve ter entre 3 e 255 caracteres',
          },
        },
      },

      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          isEmail: {
            msg: 'Email inválido',
          },
        },
      },

      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },

      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'A senha deve ter entre 6 e 50 caracteres',
          },
        },
      },

    }, {
      sequelize,
    });

    /*
    esta pegando o valor do objeto password,
    fazendo hash(criptografia) e jogando no objeto password_hash

    */
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }

      // 8 é o tamanho do hash que será gerado. !! não usar mais que 10 !!
    });

    /* pesquisar sobre addHook */

    return this;
  }

  passwordIsValid(password) {
    // compara a senha enviada pelo usuaria com o hash armazenado no BD
    return bcryptjs.compare(password, this.password_hash);
  }
}
