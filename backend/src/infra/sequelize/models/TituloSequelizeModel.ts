import { DataTypes, Model, Sequelize } from 'sequelize';

import type Models from '../models';
import { ITitulo, ITituloModel, ITituloModelCreate } from '../../../domain/protocols/models/entity/objectValues/titulo';
import { Ilancamentos } from '../../../domain/protocols/models/entity/objectValues/lancamentos';
import { SituacaoTituloEnum } from '../../../domain/implementations/constants/enum/situacaoTituloEnum';

export default class TituloSequelizeModel extends Model<ITitulo, ITituloModelCreate> implements ITituloModel {
  public idTitulo!: string;
  public numeroTitulo!: string;
  public tipoTitulo!: string;
  public vencimento!: Date;
  public situacaoTitulo!: string;
  public duplicataChaveNota!: string;
  public duplicataProtocoloNota!: string;
  public duplicataNumeroNota!: string;
  public duplicataSerieNota!: string;
  public duplicataDataEmissao!: Date;
  public duplicataNumeroFatura!: string;
  public duplicataValorLiquidoFatura!: number;
  public valorDoTitulo!: number;
  public chequeCmc7!: string;
  public idConta!: string;
  public idPagador!: string;
  public idLote!: string;
  public idMovimentacao!: string;
  public idLancamento!: Ilancamentos[];
  public isProcessado!: boolean;

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
        situacaoTitulo: {
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
        idConta: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        idPagador: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        idLote: {
          type: DataTypes.UUID,
          allowNull: true,
        },
        isProcessado: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
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
        field: 'idConta',
        name: 'idConta',
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
  }
}
