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
import { ListarLotes } from './domain/implementations/usecase/lote/listarLotes/ListarLotes';
import { ListarLotesController } from './application/controllers/lote/ListarLotesController';
import ListarLotesEntrypoint from './application/entryPoint/lote/listarLotesEntrypoint';
import { ExcluirLote } from './domain/implementations/usecase/lote/excluirLote/ExcluirLote';
import { ExcluirLoteController } from './application/controllers/lote/ExcluirLoteController';
import ExcluirLoteEntrypoint from './application/entryPoint/lote/excluirLoteEntrypoint';
import { ProcessarLote } from './domain/implementations/usecase/lote/ProcessarLote/ProcessarLote';
import { ProcessarLoteController } from './application/controllers/lote/ProcessarLoteController';
import ProcessarLoteEntrypoint from './application/entryPoint/lote/processarLoteEntrypoint';
import MovimentacaoSequelizeRepository from './infra/sequelize/repository/MovimentacaoSequelizeRepository';
import LancamentoSequelizeRepository from './infra/sequelize/repository/LancamentoSequelizeRepository';
import { ReceberPagamento } from './domain/implementations/usecase/lancamentos/receberPagamento/ReceberPagamento';
import { ReceberPagamentoController } from './application/controllers/lancamento/ReceberPagamentoController';
import ReceberPagamentoEntrypoint from './application/entryPoint/lancamento/receberPagamentoEntrypoint';
import { ListarPagamentos } from './domain/implementations/usecase/lancamentos/listarPagamentos/ListarPagamentos';
import { ListarPagamentosController } from './application/controllers/lancamento/ListarPagamentosController';
import ListarPagamentosEntrypoint from './application/entryPoint/lancamento/listarPagamentosEntrypoint';
import { CancelarPagamento } from './domain/implementations/usecase/lancamentos/cancelarPagamento/CancelarPagamento';
import { CancelarPagamentoController } from './application/controllers/lancamento/CancelarPagamentoController';
import CancelarPagamentoEntrypoint from './application/entryPoint/lancamento/cancelarPagamentoEntrypoint';
import { ListarTitulosProcessados } from './domain/implementations/usecase/titulo/listarTitulosProcessados/ListarTitulosProcessados';
import { ListarTitulosProcessadosController } from './application/controllers/titulo/ListarTitulosProcessadosController';
import ListarTitulosProcessadosEntrypoint from './application/entryPoint/titulo/listarTitulosProcessadosEntrypoint';


const jwtServices = new JwtServices();
const autenticadoGuard = new AutenticadoGuard(jwtServices);

// Repositórios
const contaRepository = new ContaSequelizeRepository();
const pagadorRepository = new PagadorSequelizeRepository();
const tituloRepository = new TituloSequelizeRepository();
const loteRepository = new LoteSequelizeRepository();
const movimentacaoRepository = new MovimentacaoSequelizeRepository();
const lancamentoRepository = new LancamentoSequelizeRepository();


// Criar Conta

const criarConta = new CriarConta(contaRepository);
const criarContaController = new CriarContaController(criarConta)
const criarContaEntryPoint = new CriarContaEntrypoint(criarContaController, []);


// Login

const login = new Login(contaRepository, jwtServices);
const loginController = new LoginController(login);
const loginEntrypoint = new LoginEntrypoint(loginController, []);


// Título

const criarTitulo = new CriarTitulo(tituloRepository, loteRepository, contaRepository);
const criarTituloController = new CriarTituloController(criarTitulo);
const criarTituloEntrypoint = new CriarTituloEntrypoint(criarTituloController, [autenticadoGuard]);

const listarTitulosPorLote = new ListarTitulosPorLote(tituloRepository, loteRepository, contaRepository);
const listarTitulosPorLoteController = new ListarTitulosPorLoteController(listarTitulosPorLote);
const listarTitulosPorLoteEntrypoint = new ListarTitulosPorLoteEntrypoint(listarTitulosPorLoteController, [autenticadoGuard]);

const listarTitulosProcessados = new ListarTitulosProcessados(tituloRepository, contaRepository, movimentacaoRepository, pagadorRepository);
const listarTitulosProcessadosController = new ListarTitulosProcessadosController(listarTitulosProcessados);
const listarTitulosProcessadosEntrypoint = new ListarTitulosProcessadosEntrypoint(listarTitulosProcessadosController, [autenticadoGuard]);

const editarTitulo = new EditarTitulo(tituloRepository, loteRepository, contaRepository);
const editarTituloController = new EditarTituloController(editarTitulo);
const editarTituloEntrypoint = new EditarTituloEntrypoint(editarTituloController, [autenticadoGuard]);

const excluirTitulo = new ExcluirTitulo(tituloRepository, loteRepository, contaRepository);
const excluirTituloController = new ExcluirTituloController(excluirTitulo);
const excluirTituloEntrypoint = new ExcluirTituloEntrypoint(excluirTituloController, [autenticadoGuard]);


// Lote

const listarLotes = new ListarLotes(loteRepository, contaRepository);
const listarLotesContoller = new ListarLotesController(listarLotes);
const listarLotesEntrypoint = new ListarLotesEntrypoint(listarLotesContoller, [autenticadoGuard]);

const processarLote = new ProcessarLote(tituloRepository, loteRepository, movimentacaoRepository, lancamentoRepository);
const processarLoteController = new ProcessarLoteController(processarLote);
const processarLoteEntrypoint = new ProcessarLoteEntrypoint(processarLoteController, [autenticadoGuard]);

const excluirLote = new ExcluirLote(loteRepository, contaRepository, tituloRepository);
const excluirLoteController = new ExcluirLoteController(excluirLote);
const excluirLoteEntrypoint = new ExcluirLoteEntrypoint(excluirLoteController, [autenticadoGuard]);


// Pagador

const buscarPagador = new BuscarPagador(pagadorRepository, contaRepository);
const buscarPagadorController = new BuscarPagadorController(buscarPagador);
const buscarPagadorEntrypoint = new BuscarPagadorEntrypoint(buscarPagadorController, [autenticadoGuard]);

const criarPagador = new CriarPagador(pagadorRepository, contaRepository);
const criarPagadorController = new CriarPagadorController(criarPagador);
const criarPagadorEntrypoint = new CriarPagadorEntrypoint(criarPagadorController, [autenticadoGuard]);

const editarPagador = new EditarPagador(pagadorRepository, contaRepository);
const editarPagadorController = new EditarPagadorController(editarPagador);
const editarPagadorEntrypoint = new EditarPagadorEntrypoint(editarPagadorController, [autenticadoGuard]);


// Lancamento

const receberPagamento = new ReceberPagamento(tituloRepository, contaRepository, movimentacaoRepository, lancamentoRepository);
const receberPagamentoController = new ReceberPagamentoController(receberPagamento);
const receberPagamentoEntrypoint = new ReceberPagamentoEntrypoint(receberPagamentoController, [autenticadoGuard]);

const listarPagamenos = new ListarPagamentos(tituloRepository, contaRepository, lancamentoRepository);
const listarPagamentosController = new ListarPagamentosController(listarPagamenos);
const listarPagamentosEntryPoint = new ListarPagamentosEntrypoint(listarPagamentosController, [autenticadoGuard]);

const cancelarPagamento = new CancelarPagamento(tituloRepository, contaRepository, movimentacaoRepository, lancamentoRepository);
const cancelarPagamentoController = new CancelarPagamentoController(cancelarPagamento);
const cancelarPagamentoEntrypint = new CancelarPagamentoEntrypoint(cancelarPagamentoController, [autenticadoGuard]);



const entryPoints: EntryPoint[] = [
  criarContaEntryPoint,
  loginEntrypoint,
  criarTituloEntrypoint,
  listarTitulosPorLoteEntrypoint,
  listarTitulosProcessadosEntrypoint,
  editarTituloEntrypoint,
  excluirTituloEntrypoint,
  listarLotesEntrypoint,
  processarLoteEntrypoint,
  excluirLoteEntrypoint,
  buscarPagadorEntrypoint,
  criarPagadorEntrypoint,
  editarPagadorEntrypoint,
  receberPagamentoEntrypoint,
  listarPagamentosEntryPoint,
  cancelarPagamentoEntrypint
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
