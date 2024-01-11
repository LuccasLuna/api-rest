import multer, { MulterError } from 'multer';
// import { extName, resolve } from 'path';
import { resolve } from 'path';

const aleatorio = () => Math.floor(Math.random() * 10000 + 10000); // retorna um numero aleatório entre 10k e 20k

/*
export default {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${aleatorio()}${extName(file.originalname)}`); // cb = callback
      // o primeiro parametro do callback recebe null se algo der errado
      // no segundo parametro, o primeiro tamplateString da o nome do arquivo como a data exata de envio(para o arquivo ter nome unico no BD)
      // o segundo tamplateString gera um numero aleatório pra garantir que não vai ter um arq com nome repetido
      // o terceiro tamplateString pega o nome da extenção do arquivo(ex: jpg, png...)
    },
  }),
};
*/

export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      return cb(new MulterError('Arquivo precisa ser png ou jpg'));
    }

    return cb(null, true);
  },

  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file, cb) => {
      // cb(null, `${Date.now()}${extName(file.originalname)}`); extName ta dando erro
      cb(null, `${Date.now()}_${aleatorio()}.${file.originalname.split('.').pop()}`);
    },
  }),
};
