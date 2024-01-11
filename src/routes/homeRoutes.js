import { Router } from 'express';
import homeController from '../controllers/HomeController'; // homeController Não esta com H maiusculo pq ja ta importando o objeto da class diretamente sem instanciar
// foi instanciada no direto do export

const router = new Router();

router.get('/', homeController.index);

export default router;

/*

** METODOS DO CONTROLLER

index -> lista todos os usuarios  -> GET
store/create -> cria um novo usuario -> POST
delete -> apaga um usuario -> DELETE
show -> mostra um usuario  -> GET
update -> atualiza um usuario -> PATCH ou PUT

*/
