// import { DataTypes, Model, Sequelize } from 'sequelize';

// import { IPessoaModel, IPessoaModelCreate } from '../../../domain/protocols/models/entity/pessoa';
// import { IConta } from '../../../domain/protocols/models/entity/conta';
// import { IEmail } from '../../../domain/protocols/models/entity/email';
// import { IEndereco } from '../../../domain/protocols/models/entity/endereco';
// import { ITelefone } from '../../../domain/protocols/models/entity/telefone';
// import { ICliente } from '../../../domain/protocols/models/entity/cliente';

// import type Models from '../models';

// export default class PessoaSequelizeModel extends Model<IPessoaModel, IPessoaModelCreate> implements IPessoaModel {
//   public idPessoa!: string;

//   public nome!: string;

//   public identificacao!: string;

//   public nomeMae!: string | null;

//   public nomeFantasia!: string | null;

//   public inscricaoEstadual!: string | null;

//   public inscricaoMunicipal!: string | null;

//   public idConta!: string;

//   public conta!: IConta | undefined;

//   public cliente!: ICliente | undefined;

//   public emails!: IEmail[] | undefined;

//   public telefones!: ITelefone[] | undefined;

//   public enderecos!: IEndereco[] | undefined;

//   static initialization(sequelize: Sequelize): void {
//     this.init(
//       {
//         idPessoa: {
//           type: DataTypes.UUID,
//           primaryKey: true,
//         },
//         nome: {
//           type: DataTypes.TEXT,
//           allowNull: false,
//         },
//         identificacao: {
//           type: DataTypes.TEXT,
//           allowNull: false,
//         },
//         nomeFantasia: {
//           type: DataTypes.TEXT,
//           allowNull: true,
//         },
//         inscricaoEstadual: {
//           type: DataTypes.TEXT,
//           allowNull: true,
//         },
//         inscricaoMunicipal: {
//           type: DataTypes.TEXT,
//           allowNull: true,
//         },
//         nomeMae: {
//           type: DataTypes.TEXT,
//           allowNull: true,
//         },
//         idConta: {
//           type: DataTypes.UUID,
//           allowNull: false,
//         },
//       },
//       {
//         sequelize,
//         freezeTableName: true,
//         tableName: 'pessoa',
//         underscored: false,
//         indexes: [{ fields: ['idPessoa'] }, { fields: ['idConta'] }],
//       },
//     );
//   }

//   static association(pModels: Models): void {
//     this.belongsTo(pModels.conta, {
//       as: 'conta',
//       foreignKey: 'idConta',
//     });

//     this.hasOne(pModels.cliente, {
//       as: 'cliente',
//       foreignKey: 'idPessoa',
//     });

//     this.hasMany(pModels.email, {
//       as: 'emails',
//       foreignKey: 'idPessoa',
//     });

//     this.hasMany(pModels.endereco, {
//       as: 'enderecos',
//       foreignKey: 'idPessoa',
//     });

//     this.hasMany(pModels.telefone, {
//       as: 'telefones',
//       foreignKey: 'idPessoa',
//     });
//   }
// }
