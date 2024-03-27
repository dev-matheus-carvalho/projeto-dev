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
import CriarContaController from './application/controllers/conta/criarContaController';
import CriarContaEntrypoint from './application/entryPoint/conta/criarContaEntrypoint';
import { AssertsUtils } from './domain/implementations/utils/asserts.utils';
import LoginController from './application/controllers/conta/loginController';
import LoginEntrypoint from './application/entryPoint/conta/loginEntrypoint';

const bufferUtils = new BufferUtils();
const assertUtils = new AssertsUtils();

// const contaRepository = new ContaSequelizeRepository();

const jwtServices = new JwtServices();
// const criptografiaServices = new CriptografiaServices(bufferUtils);

const autenticadoGuard = new AutenticadoGuard(jwtServices);

// const rootUsecase = new RootUsecase();
// const rootController = new RootController(rootUsecase);
// const rootEntrypoint = new RootEntrypoint(rootController, []);

// const criarContaUsecase = new CriarContaUsecase(contaRepository, criptografiaServices);
// const criarContaController = new CriarContaController(criarContaUsecase);
// const criarContaEntrypoint = new CriarContaEntrypoint(criarContaController, []);

// const loginUsecase = new LoginUsecase(contaRepository, criptografiaServices, jwtServices, assertUtils);
// const loginController = new LoginController(loginUsecase);
// const loginEntrypoint = new LoginEntrypoint(loginController, []);

const entryPoints: EntryPoint[] = [];

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
