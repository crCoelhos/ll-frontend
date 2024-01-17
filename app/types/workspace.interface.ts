export type Workspace = {
  id: number;
  name: string;
  description: string;
  capacity: number;
  workspaceTypeId: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string | "";
};
