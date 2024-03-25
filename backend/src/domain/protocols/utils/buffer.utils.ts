export interface IBufferUtils {
  base64ParaBuffer(pValor: string): Buffer;
  arrayBufferParaString(pBuffer: ArrayBuffer): string;
  arrayBufferParaBase64(pBuffer: ArrayBuffer): string;
}
