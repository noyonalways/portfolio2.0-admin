export * from "./category";

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

export type TMeta = {
  limit: number;
  nextPage: number | null;
  page: number;
  prevPage: number | null;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data: T;
  success: boolean;
  message: string;
  statusCode: number;
  meta?: TMeta;
};
