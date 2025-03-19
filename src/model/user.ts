export type User = {
  name: string;
  id: number;
  email: string;
  avatar: string | null;
  registerType: string;
  role: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
};
