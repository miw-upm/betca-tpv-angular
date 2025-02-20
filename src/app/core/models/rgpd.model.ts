import { User } from '@core/models/user.model';
import { RgpdType } from './rgpd-type.model';

export interface Rgpd {
  type: RgpdType;
  agreement: Uint8Array | null;
  user: User;
}
