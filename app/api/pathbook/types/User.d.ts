import { File } from "./File";

export type User = {
  id: string;
  email: string;
  username: string;
  sex: string;
  birthDate: string | null;
  bio: string | null;
  icon: File;
  banner: File;
};
