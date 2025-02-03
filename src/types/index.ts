export type TUser = {
  _id?: string;
  email?: string;
  role?: string;
  name?: string;
  avatar?: string;
};

export type TResponseError = {
  errorSources: [
    {
      path: string;
      message: string;
    }
  ];
  message: string;
  statusCode: number;
  success: boolean;
};
