import * as crypto from 'crypto';
import { BufferUtils } from '../../../domain/implementations/utils/buffer.utils';
import { CriptografiaServices } from '../../../domain/implementations/services/criptografia.services';

describe('Suite de teste para o serviço de criptografia', () => {
  const bufferUtils = new BufferUtils();
  let criptografiaServices: CriptografiaServices;

  let publicKey: crypto.webcrypto.CryptoKey;
  let privateKeyRaw: string;
  const aesKey = crypto.randomBytes(16).toString('hex');
  const aesIv = crypto.randomBytes(8).toString('hex');

  beforeAll(async () => {
    const keys = await crypto.webcrypto.subtle.generateKey(
      {
        name: 'RSA-OAEP',
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: 'SHA-256',
      },
      true,
      ['encrypt', 'decrypt'],
    );
    publicKey = keys.publicKey;
    const exportedPrivateKey = await crypto.webcrypto.subtle.exportKey('pkcs8', keys.privateKey);
    privateKeyRaw = bufferUtils.arrayBufferParaBase64(exportedPrivateKey);
    criptografiaServices = new CriptografiaServices(bufferUtils);
    await criptografiaServices.importarPrivateKeyFrontend(privateKeyRaw);
    criptografiaServices.importAesKeys(aesKey, aesIv);
  });

  it('Deve descriptografar o texto "TESTE-TEXT"', async () => {
    const textoEsperado = 'TESTE-TEXT';

    const encryptedTextBuffer = await crypto.webcrypto.subtle.encrypt(
      { name: 'RSA-OAEP' },
      publicKey,
      new TextEncoder().encode(textoEsperado),
    );
    const encryptedTextString = bufferUtils.arrayBufferParaBase64(encryptedTextBuffer);
    const textoDecriptografado = await criptografiaServices.decriptografaSenhaFrontend(encryptedTextString);
    expect(textoDecriptografado).toBe(textoEsperado);
  });

  it('Deve descriptografar null ao falhar de descriptografar o texto.', async () => {
    const textoDecriptografado = await criptografiaServices.decriptografaSenhaFrontend('encryptedTextString');
    expect(textoDecriptografado).toBe(null);
  });

  it('Deve criptografar o teste "TESTE-TEXT".', async () => {
    const textoEsperado = 'TESTE-TEXT';
    const textoDecriptografado = criptografiaServices.criptografaSenha(textoEsperado);
    expect(textoDecriptografado).toBeTruthy();
  });
});
