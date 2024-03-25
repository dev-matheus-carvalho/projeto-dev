export default interface ICriptografiaServices {
  decriptografaSenhaFrontend(pPassword: string): Promise<string | null>;
  criptografaSenha(pSenha: string): string;
}
