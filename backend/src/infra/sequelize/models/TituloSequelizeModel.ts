import { DataTypes, Model, Sequelize } from 'sequelize';

import type Models from '../models';
import { ITitulo, ITituloModel, ITituloModelCreate } from '../../../domain/protocols/models/entity/objectValues/titulo';

export default class TituloSequelizeModel extends Model<ITitulo, ITituloModelCreate> implements ITituloModel {
  public numeroTitulo!: string;
  public tipoTitulo!: string;
  public vencimento!: Date;
  public situaçaoTitulo!: string;
  public duplicataChaveNota?: string;
  public duplicataProtocoloNota?: string;
  public duplicataNumeroNota?: string;
  public duplicataSerieNota?: string;
  public duplicataDataEmissao?: Date;
  public duplicataNumeroFatura?: string;
  public numeroDoTitulo?: string;
  public duplicataValorLiquidoFatura?: number;
  public valorDoTitulo!: number;
  public chequeCmc7?: string;
  public identificacao!: string;
  public idLote?: string;
  public idMovimentacao?: string;
  public idLancamento?: string;
  public isProcessado!: boolean;

  static initialization(sequelize: Sequelize): void {
    this.init(
      {
        numeroTitulo: {
          type: DataTypes.TEXT,
          primaryKey: true,
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
        situaçaoTitulo: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        duplicataChaveNota: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        duplicataProtocoloNota: {
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
        numeroDoTitulo: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        duplicataValorLiquidoFatura: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        valorDoTitulo: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        chequeCmc7: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        identificacao: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        idLote: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        idMovimentacao: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        idLancamento: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        isProcessado: {
          type: DataTypes.BOOLEAN,
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
        field: 'identificacao',
        name: 'identificacao',
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
        field: 'numeroTitulo',
        name: 'numeroTitulo',
      },
    });

    this.hasMany(pModels.lancamentos, {
      as: 'lancamentos',
      foreignKey: {
        field: 'numeroTitulo',
        name: 'numeroTitulo',
      },
    });
  }
}
