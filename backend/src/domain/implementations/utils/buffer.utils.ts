import { IBufferUtils } from '../../protocols/utils/buffer.utils';

export class BufferUtils implements IBufferUtils {
  public base64ParaBuffer(pValor: string): Buffer {
    return Buffer.from(pValor, 'base64');
  }

  public arrayBufferParaString(pBuffer: ArrayBuffer): string {
    return String.fromCharCode.apply(null, new Uint8Array(pBuffer) as any);
  }

  public arrayBufferParaBase64(pBuffer: ArrayBuffer): string {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(pBuffer) as any));
  }
}
