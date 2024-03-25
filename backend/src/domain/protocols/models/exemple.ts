export interface IExemple {
    idExemple: string;
    exempleField: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IExempleModel extends Partial<IExemple> {}

export interface IExempleModelCreate extends Partial<IExempleModel> {}
