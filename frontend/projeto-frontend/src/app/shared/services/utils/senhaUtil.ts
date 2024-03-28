export class SenhasUtil {

    static verificarSenhaForte(senha: string): boolean {
      return /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(senha);
    }
  
  }