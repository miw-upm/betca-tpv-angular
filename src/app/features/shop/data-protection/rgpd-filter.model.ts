import { RgpdType } from '@core/models/rgpd-type.model';

export interface RgpdFilter {
  user?: string;
  mobile?: string;
  type?: RgpdType | '';
}
