import * as crypto from 'crypto';

import { environments } from '../../../environment';
import ICriptografiaServices from '../../protocols/services/criptografia.services';
import { IBufferUtils } from '../../protocols/utils/buffer.utils';

export class CriptografiaServices implements ICriptografiaServices {
  private frontendPrivateKey!: crypto.webcrypto.CryptoKey;

  private aesIv!: string;

  private aesKey!: string;

  constructor(private bufferUtils: IBufferUtils) {
    if (environments.FRONTEND_PRIVATE_KEY) {
      this.importarPrivateKeyFrontend(environments.FRONTEND_PRIVATE_KEY);
    }
    if (environments.AES_IV && environments.AES_KEY) {
      this.importAesKeys(environments.AES_KEY, environments.AES_IV);
    }
  }

  public async importarPrivateKeyFrontend(pPrivateKey: string): Promise<void> {
    const keyBuffer = Buffer.from(pPrivateKey, 'base64');
    this.frontendPrivateKey = await crypto.webcrypto.subtle.importKey(
      'pkcs8',
      keyBuffer,
      { name: 'RSA-OAEP', hash: 'SHA-256' },
      true,
      ['decrypt'],
    );
  }

  public importAesKeys(pAesKey: string, pAesIv: string): void {
    this.aesIv = pAesIv;
    this.aesKey = pAesKey;
  }

  public async decriptografaSenhaFrontend(pPassword: string): Promise<string | null> {
    try {
      const bufferOrigem = this.bufferUtils.base64ParaBuffer(pPassword);
      const textoDecriptografadoBuffer = await crypto.webcrypto.subtle.decrypt(
        { name: 'RSA-OAEP' },
        this.frontendPrivateKey,
        bufferOrigem,
      );
      return this.bufferUtils.arrayBufferParaString(textoDecriptografadoBuffer);
    } catch (error) {
      return null;
    }
  }

  criptografaSenha(pSenha: string): string {
    const cipher = crypto.createCipheriv('aes-256-gcm', this.aesKey, this.aesIv);
    let senhaCriptografada = cipher.update(pSenha, 'utf8', 'hex');
    senhaCriptografada += cipher.final('hex');
    return senhaCriptografada;
  }
}
