import { emailRegex } from '../constants/regex/emailRegex';
import { uuidRegex } from '../constants/regex/uuidRegex';

export class ValidadorDadosUtils {
  private valor: any;

  private erro: null | string = null;

  private atributo: string = '';

  static iniciar(valor: any, nomeAtributo: string): ValidadorDadosUtils {
    const validador = new ValidadorDadosUtils();
    validador.setarDados(valor, nomeAtributo);
    return validador;
  }

  public setarDados(valor: any, nomeAtributo: string): this {
    this.valor = valor;
    this.atributo = nomeAtributo;
    this.erro = null;
    return this;
  }

  /**
   * Checa se o valor inicializado foi informado.
   */
  public obrigatorio(): this {
    if (this.estaValorVazio() || this.valor === '') {
      this.setErro('E obrigatório');
    }

    return this;
  }

  /**
   * Checa se o valor informado e um objeto.
   */
  public object(): this {
    if (this.estaComValorInvalido()) return this;

    if (typeof this.valor !== 'object') {
      this.setErro('Não e um objeto');
    }
    return this;
  }

  /**
   * Checa se o valor informado e do tipo "boolean".
   */
  public boolean(): this {
    if (this.estaComValorInvalido()) return this;

    if (typeof this.valor !== 'boolean') {
      this.setErro('Não e do tipo boolean');
    }

    return this;
  }

  /**
   * Checa se o valor informado e um numero válido.
   */
  public number(): this {
    if (this.estaComValorInvalido()) return this;

    if (Number.isNaN(Number(this.valor)) === true) {
      this.setErro('Não e do tipo number');
    }
    return this;
  }

  /**
   * Checa se o valor informado e uma String válida.
   * Strings vazias são válidas. Usar o "naoVazio" se preciso.
   */
  public string(): this {
    if (this.estaComValorInvalido()) return this;

    if ((typeof this.valor === 'string') === false) {
      this.setErro('Não e do tipo string');
    }
    return this;
  }

  /**
   * Checa se o valor informado e uma string e está Vazia.
   * Qualquer outro tipo de valor a validação será ignorada.
   */
  public naoVazio(): this {
    if (this.estaComValorInvalido()) return this;

    if ((typeof this.valor === 'string') === true && this.valor === '') {
      this.setErro('O valor informado não pode ser vazio');
    }
    return this;
  }

  /**
   * Checa se o valor informado e uma string e no valor possui espaços vazios.
   */
  public semEspacos(): this {
    if (this.estaComValorInvalido()) return this;

    if ((typeof this.valor === 'string') === true && this.valor.trim().split(' ').length > 1) {
      this.setErro('O valor informado não pode possuir espaços em brancos');
    }
    return this;
  }

  /**
   * Checa se o valor informado e uma data válida
   */
  public date(): this {
    if (this.estaComValorInvalido()) return this;

    const dateTmp = new Date(this.valor);
    if (dateTmp.toString() === 'Invalid Date') {
      this.setErro('Não e uma data válida.');
    }
    return this;
  }

  /**
   * Checa se o valor informado e um Array válido.
   */
  public array(): this {
    if (this.estaComValorInvalido()) return this;

    if (this.valor instanceof Array === false) {
      this.setErro('Não e um array.');
    }
    return this;
  }

  /**
   * Checa se o valor informado e um email válido.
   */
  public email(): this {
    if (this.estaComValorInvalido()) return this;

    if (emailRegex.test(this.valor.toLowerCase()) === false) {
      this.setErro('Não e um email válido.');
    }

    return this;
  }

  /**
   * Checa se o valor informado e está dentro da lista informada.
   */
  public listaValores(pListaValores: any[]): this {
    if (this.estaComValorInvalido()) return this;

    if (pListaValores.includes(this.valor) === false) {
      this.setErro('Não e um valor válido.');
    }

    return this;
  }

  /**
   * Checa se o valor informado e um uuid válido.
   */
  public uuid(): this {
    if (this.estaComValorInvalido()) return this;

    if (uuidRegex.test(this.valor.toLowerCase()) === false) {
      this.setErro('Não e um UUID válido.');
    }

    return this;
  }

  public estaValido(): boolean {
    return this.erro === null;
  }

  public estaInvalido(): boolean {
    return !this.estaValido();
  }

  public getErro(): string {
    return this.erro ?? '';
  }

  public getErroCompleto(): string {
    return `O atributo "${this.atributo}": ${this.erro ?? ''}.`;
  }

  private setErro(pErro: string): void {
    if (this.erro === null) {
      this.erro = pErro;
    }
  }

  private estaValorVazio(): boolean {
    if (this.valor === undefined || this.valor === null) {
      return true;
    }
    return false;
  }

  private estaComValorValido(): boolean {
    return this.erro === null && this.estaValorVazio() === false;
  }

  private estaComValorInvalido(): boolean {
    return !this.estaComValorValido();
  }
}
