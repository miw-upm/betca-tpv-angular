export interface SessionRecord {
  mobile: number;
  firstLogin: string;
  lastLogout?: string;
}

export interface LastLogoutUpdate {
  lastLogout: string;
}
