import './environment';
import './infra/sequelize/db';

import { ExpressServer } from './infra/express/express';

import AutenticadoGuard from './application/guards/AutenticadoGuard';
import RootController from './application/controllers/root/RootController';
import RootEntrypoint from './application/entryPoint/root/RootEntrypoint';
import EntryPoint from './domain/implementations/entity/entryPoint/EntryPoint';
import JwtServices from './domain/implementations/services/Jwt.service';
import { BufferUtils } from './domain/implementations/utils/buffer.utils';
import { CriptografiaServices } from './domain/implementations/services/criptografia.services';
import CriarContaEntrypoint from './application/entryPoint/conta/criarContaEntrypoint';
import { AssertsUtils } from './domain/implementations/utils/asserts.utils';
import LoginEntrypoint from './application/entryPoint/conta/loginEntrypoint';
import { CriarContaController } from './application/controllers/conta/criarContaController';
import { CriarConta } from './domain/implementations/usecase/conta/criarConta/CriarConta';
import ContaSequelizeRepository from './infra/sequelize/repository/ContaSequelizeRepository';
import { Login } from './domain/implementations/usecase/conta/login/Login';
import { LoginController } from './application/controllers/conta/loginController';
import PagadorSequelizeRepository from './infra/sequelize/repository/PagadorSequelizeRepository';
import { CriarPagador } from './domain/implementations/usecase/pagador/criarPagador/CriarPagador';
import { CriarPagadorController } from './application/controllers/pagador/CriarPagadorController';
import CriarPagadorEntrypoint from './application/entryPoint/pagador/criarPagadorEntrypoint';
import { EditarPagador } from './domain/implementations/usecase/pagador/editarPagador/EditarPagador';
import { EditarPagadorController } from './application/controllers/pagador/EditarPagadorController';
import EditarPagadorEntrypoint from './application/entryPoint/pagador/editarPagadorEntrypoint';

const bufferUtils = new BufferUtils();
const assertUtils = new AssertsUtils();

// const contaRepository = new ContaSequelizeRepository();

const jwtServices = new JwtServices();
// const criptografiaServices = new CriptografiaServices(bufferUtils);

const autenticadoGuard = new AutenticadoGuard(jwtServices);

//================================================================
/* ======================== Conta ============================= */
//================================================================

// ********************** Criar Conta ****************************
const contaRepository = new ContaSequelizeRepository();

const criarConta = new CriarConta(contaRepository);
const criarContaController = new CriarContaController(criarConta)
const criarContaEntryPoint = new CriarContaEntrypoint(criarContaController);

// ************************ Login ********************************

const login = new Login(contaRepository);
const loginController = new LoginController(login);
const loginEntrypoint = new LoginEntrypoint(loginController);

// Pagador

const pagadorRepository = new PagadorSequelizeRepository();

const criarPagador = new CriarPagador(pagadorRepository);
const criarPagadorController = new CriarPagadorController(criarPagador);
const criarPagadorEntrypoint = new CriarPagadorEntrypoint(criarPagadorController);

const editarPagador = new EditarPagador(pagadorRepository);
const editarPagadorController = new EditarPagadorController(editarPagador);
const editarPagadorEntrypoint = new EditarPagadorEntrypoint(editarPagadorController);

const entryPoints: EntryPoint[] = [
  criarContaEntryPoint,
  loginEntrypoint,
  criarPagadorEntrypoint,
  editarPagadorEntrypoint
];

const expressServer: ExpressServer = new ExpressServer();
expressServer.setEntryPoints(entryPoints);

process.on('unhandledRejection', (pError) => {
  console.error('');
  console.error('############################## UnhandledRejection ##############################');
  console.error(pError);
  console.error('################################################################################');
  console.error('');
  process.exit();
});

expressServer.start();
