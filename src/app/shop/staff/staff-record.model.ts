import {User} from "@core/user.model";

export interface StaffRecord {
  user: User;
  login: Date;
  logout: Date;
}
