import { RgpdType } from '@core/models/rgpd-type.model';

export interface RgpdDto {
  rgpdType: RgpdType;
  agreement: string;
  userName: string;
  userMobile: string;
}
