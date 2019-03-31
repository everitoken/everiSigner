export interface AccountType {
  id: string;
  name: string;
  createdAt: Date;
}

export interface AuthenticationType {
  status: string;
  password?: string;
}

// TODO: check native types
export interface WithRouterType {
  history: any;
  match: any;
  location: any;
}
