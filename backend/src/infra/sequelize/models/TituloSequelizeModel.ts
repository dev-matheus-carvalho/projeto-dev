import { DataTypes, Model, Sequelize } from 'sequelize';

import type Models from '../models';
import { ISituacao, ISituacaoModel, ISituacaoModelCreate } from '../../../domain/protocols/models/lote';
import { ITitulo, ITituloModel, ITituloModelCreate } from '../../../domain/protocols/models/titulo';

export default class LoteSequelizeModel extends Model<ITitulo, ITituloModelCreate> implements ITituloModel {
  public idTitulo!: string;
  public numeroTitulo!: string;
  public tipoTitulo!: string;
  public valorTotalTitulo!: number;
  public vencimento!: Date;
  public situaçao!: string;
  public duplicataChaveNota?: string;
  public duplicataSerieNota?: string;
  public duplicataDataEmissao?: Date;
  public duplicataNumeroFatura?: string;
  public duplicataValorLiquidoFatura?: number;
  public chequeCmc7?: string;
  

  static initialization(sequelize: Sequelize): void {
    this.init(
      {
        idTitulo: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
        },
        numeroTitulo: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        tipoTitulo: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        valorTotalTitulo: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
        qtdTitulos: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: 'lote',
        underscored: false,
        // indexes: [{ fields: ['idSituacao'] }],
      },
    );
  }

  static association(pModels: Models): void {
    // this.belongsTo(pModels.lote, {
    //   as: 'lote',
    //   foreignKey: 'idSituacao',
    // });

  //   this.hasOne(pModels.cliente, {
  //     as: 'cliente',
  //     foreignKey: 'idPessoa',
  //   });

  //   this.hasMany(pModels.email, {
  //     as: 'emails',
  //     foreignKey: 'idPessoa',
  //   });

  //   this.hasMany(pModels.endereco, {
  //     as: 'enderecos',
  //     foreignKey: 'idPessoa',
  //   });

  //   this.hasMany(pModels.telefone, {
  //     as: 'telefones',
  //     foreignKey: 'idPessoa',
  //   });
  }
}
