import { uuidv7 } from 'uuidv7';

import { IUuidUtils } from '../../protocols/utils/uuid.utils';

export class UuidUtils implements IUuidUtils {
  public generateV7(): string {
    return uuidv7();
  }
}

export default new UuidUtils();
