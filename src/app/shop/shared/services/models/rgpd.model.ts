import {RgpdType} from "./RgpdType";
import {User} from "@core/user.model";

export interface Rgpd{
  type: RgpdType;
  agreement: Uint8Array;
  user: User;
}
