import { DataTypes, Model, Sequelize } from 'sequelize';

import type Models from '../models';
import { ITitulo, ITituloModel, ITituloModelCreate } from '../../../domain/protocols/models/entity/objectValues/titulo';

export default class TituloSequelizeModel extends Model<ITitulo, ITituloModelCreate> implements ITituloModel {
  public idTitulo!: string;
  public numeroTitulo!: string;
  public tipoTitulo!: string;
  public vencimento!: Date;
  public situaçao!: string;
  public duplicataChaveNota?: string;
  public duplicataNumeroNota?: string;
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
        vencimento: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        situaçao: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        duplicataChaveNota: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        duplicataNumeroNota: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        duplicataSerieNota: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        duplicataDataEmissao: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        duplicataNumeroFatura: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        duplicataValorLiquidoFatura: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        chequeCmc7: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: 'titulo',
        underscored: false,
        // indexes: [{ fields: ['idSituacao'] }],
      },
    );
  }

  static association(pModels: Models): void {
    this.belongsTo(pModels.conta, {
      as: 'conta',
      foreignKey: {
        field: 'email',
        name: 'email',
      },
    });

    this.belongsTo(pModels.pagador, {
      as: 'pagador',
      foreignKey: {
        field: 'idPagador',
        name: 'idPagador',
      },
    });

    this.belongsTo(pModels.lote, {
      as: 'lote',
      foreignKey: {
        field: 'idLote',
        name: 'idLote',
      },
    });

    this.hasOne(pModels.movimentacao, {
      as: 'movimentacao',
      foreignKey: {
        field: 'idTitulo',
        name: 'idTitulo',
      },
    });

    this.hasMany(pModels.lancamentos, {
      as: 'lancamentos',
      foreignKey: {
        field: 'idTitulo',
        name: 'idTitulo',
      },
    });

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
