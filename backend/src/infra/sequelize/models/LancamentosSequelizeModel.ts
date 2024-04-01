import { DataTypes, Model, Sequelize } from 'sequelize';

import type Models from '../models';
import { Ilancamentos, IlancamentosModel, IlancamentosModelCreate } from '../../../domain/protocols/models/entity/objectValues/lancamentos';

export default class LancamentosSequelizeModel extends Model<Ilancamentos, IlancamentosModelCreate> implements IlancamentosModel {
  public idLancamento!: string;
  public dataEvento!: Date;
  public dataCredito!: Date;
  public valorPrincipal!: number;
  public valorMulta!: number;
  public valorJuros!: number;

  public tipoPagamento!: string;
  public ativo!: boolean;
  
  static initialization(sequelize: Sequelize): void {
    this.init(
      {
        idLancamento: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
        },
        dataEvento: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        dataCredito: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        valorPrincipal: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        valorMulta: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        valorJuros: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        tipoPagamento: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        ativo: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: 'lancamentos',
        underscored: false,
        // indexes: [{ fields: ['idSituacao'] }],
      },
    );
  }

  static association(pModels: Models): void {
    this.belongsTo(pModels.titulo, {
      as: 'titulo',
      foreignKey: {
        field: 'numeroTitulo',
        name: 'numeroTitulo',
      },
    });
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
