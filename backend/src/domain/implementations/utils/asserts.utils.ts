import IAssertsUtils from '../../protocols/utils/asserts.utils';

export class AssertsUtils implements IAssertsUtils {
  public naoUndefined<T>(pValue: T | undefined, pError?: Error | undefined): asserts pValue is T {
    if (pValue === undefined) {
      this.throwError('O valor e undefined', pError);
    }
  }

  naoNull<T>(pValue: T | null, pError?: Error | undefined): asserts pValue is T {
    if (pValue === null) {
      this.throwError('O valor e null', pError);
    }
  }

  public naoNullOuUndefined<T>(pValue: T | null | undefined, pError?: Error): asserts pValue is NonNullable<T> {
    if (pValue === null || pValue === undefined) {
      this.throwError('O valor e null ou undefined', pError);
    }
  }

  private throwError(pMensagemGenerica: string, pError?: Error): void {
    if (pError) {
      throw pError;
    }

    throw new Error(pMensagemGenerica);
  }
}

export default new AssertsUtils();
