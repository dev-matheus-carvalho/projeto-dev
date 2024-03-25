export default interface IAssertsUtils {
  naoUndefined<T>(pValue: T | undefined, pError?: Error): asserts pValue is T;
  naoNull<T>(pValue: T | null, pError?: Error): asserts pValue is T;
  naoNullOuUndefined<T>(pValue: T | null | undefined, pError?: Error): asserts pValue is NonNullable<T>;
}
