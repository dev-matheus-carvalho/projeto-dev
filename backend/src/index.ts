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
const loginEntrypoint = new LoginEntrypoint(loginController)

const entryPoints: EntryPoint[] = [
  criarContaEntryPoint,
  loginEntrypoint,
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
