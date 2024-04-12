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
import { BuscarPagador } from './domain/implementations/usecase/pagador/buscarPagador/BuscarPagador';
import { BuscarPagadorController } from './application/controllers/pagador/BuscarPagadorController';
import BuscarPagadorEntrypoint from './application/entryPoint/pagador/buscarPagadorEntrypoint';
import TituloSequelizeRepository from './infra/sequelize/repository/TituloSequelizeRepository';
import { CriarTitulo } from './domain/implementations/usecase/titulo/criarTitulo/CriarTitulo';
import { CriarTituloController } from './application/controllers/titulo/CriarTituloController';
import CriarTituloEntrypoint from './application/entryPoint/titulo/criarTituloEntrypoint';
import LoteSequelizeRepository from './infra/sequelize/repository/LoteSequelizeRepository';
import { EditarTitulo } from './domain/implementations/usecase/titulo/editarTitulo/EditarTitulo';
import { EditarTituloController } from './application/controllers/titulo/EditarTituloController';
import EditarTituloEntrypoint from './application/entryPoint/titulo/editarTituloEntrypoint';
import { ListarTitulosPorLote } from './domain/implementations/usecase/titulo/listarTitulosPorLote/ListarTitulosPorLote';
import { ListarTitulosPorLoteController } from './application/controllers/titulo/ListarTitulosPorLoteController';
import ListarTitulosPorLoteEntrypoint from './application/entryPoint/titulo/ListarTitulosPorLoteEntrypoint';
import { ExcluirTitulo } from './domain/implementations/usecase/titulo/excluirTitulo/ExcluirTitulo';
import { ExcluirTituloController } from './application/controllers/titulo/ExcluirTituloController';
import ExcluirTituloEntrypoint from './application/entryPoint/titulo/excluirTituloEntrypoint';
import { EditarLote } from './domain/implementations/usecase/lote/editarLote/EditarLote';
import { EditarLoteController } from './application/controllers/lote/EditarLoteController';
import EditarLoteEntrypoint from './application/entryPoint/lote/editarLoteEntrypoint';
import { ListarLotes } from './domain/implementations/usecase/lote/listarLotes/ListarLotes';
import { ListarLotesController } from './application/controllers/lote/ListarLotesController';
import ListarLotesEntrypoint from './application/entryPoint/lote/listarLotesEntrypoint';

const bufferUtils = new BufferUtils();
const assertUtils = new AssertsUtils();

// const contaRepository = new ContaSequelizeRepository();

const jwtServices = new JwtServices();
// const criptografiaServices = new CriptografiaServices(bufferUtils);

const autenticadoGuard = new AutenticadoGuard(jwtServices);

// Repositórios
const contaRepository = new ContaSequelizeRepository();
const pagadorRepository = new PagadorSequelizeRepository();
const tituloRepository = new TituloSequelizeRepository();
const loteRepository = new LoteSequelizeRepository();


// Criar Conta

const criarConta = new CriarConta(contaRepository);
const criarContaController = new CriarContaController(criarConta)
const criarContaEntryPoint = new CriarContaEntrypoint(criarContaController);


// Login

const login = new Login(contaRepository);
const loginController = new LoginController(login);
const loginEntrypoint = new LoginEntrypoint(loginController);


// Título

const criarTitulo = new CriarTitulo(tituloRepository, loteRepository, contaRepository);
const criarTituloController = new CriarTituloController(criarTitulo);
const criarTituloEntrypoint = new CriarTituloEntrypoint(criarTituloController);

const listarTitulosPorLote = new ListarTitulosPorLote(tituloRepository);
const listarTitulosPorLoteController = new ListarTitulosPorLoteController(listarTitulosPorLote);
const listarTitulosPorLoteEntrypoint = new ListarTitulosPorLoteEntrypoint(listarTitulosPorLoteController);

const editarTitulo = new EditarTitulo(tituloRepository, loteRepository, contaRepository);
const editarTituloController = new EditarTituloController(editarTitulo);
const editarTituloEntrypoint = new EditarTituloEntrypoint(editarTituloController);

const excluirTitulo = new ExcluirTitulo(tituloRepository);
const excluirTituloController = new ExcluirTituloController(excluirTitulo);
const excluirTituloEntrypoint = new ExcluirTituloEntrypoint(excluirTituloController);


// Lote

const listarLotes = new ListarLotes(loteRepository);
const listarLotesContoller = new ListarLotesController(listarLotes);
const listarLotesEntrypoint = new ListarLotesEntrypoint(listarLotesContoller);

const editarLote = new EditarLote(tituloRepository, loteRepository);
const editarLoteController = new EditarLoteController(editarLote);
const editarLoteEntrypoint = new EditarLoteEntrypoint(editarLoteController);


// Pagador

const buscarPagador = new BuscarPagador(pagadorRepository, contaRepository);
const buscarPagadorController = new BuscarPagadorController(buscarPagador);
const buscarPagadorEntrypoint = new BuscarPagadorEntrypoint(buscarPagadorController);

const criarPagador = new CriarPagador(pagadorRepository, contaRepository);
const criarPagadorController = new CriarPagadorController(criarPagador);
const criarPagadorEntrypoint = new CriarPagadorEntrypoint(criarPagadorController);

const editarPagador = new EditarPagador(pagadorRepository, contaRepository);
const editarPagadorController = new EditarPagadorController(editarPagador);
const editarPagadorEntrypoint = new EditarPagadorEntrypoint(editarPagadorController);


const entryPoints: EntryPoint[] = [
  criarContaEntryPoint,
  loginEntrypoint,
  criarTituloEntrypoint,
  listarTitulosPorLoteEntrypoint,
  editarTituloEntrypoint,
  excluirTituloEntrypoint,
  listarLotesEntrypoint,
  editarLoteEntrypoint,
  buscarPagadorEntrypoint,
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
