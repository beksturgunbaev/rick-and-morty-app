export interface IParams {
  page?: number;
}

export interface IInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface ApiResponse<T> {
  results: T[];
  info: IInfo;
}
