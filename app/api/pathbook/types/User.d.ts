export type User = {
  id: string,
  username: string,
  password: string,
  email: string,
  authorities: ReadonlyArray<Record<string, string>>,
  accountNonExpired: boolean,
  accountNonLocked: boolean,
  credentialsNonExpired: boolean,
  enabled: boolean,
};
