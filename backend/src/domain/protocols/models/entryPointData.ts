export interface IEntrypointData<TBody = any, TParametros = any> {
  tokenAuthorization: string;
  body: TBody;
  parametros: TParametros;
}
