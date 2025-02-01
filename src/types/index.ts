export type TUser = {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
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
