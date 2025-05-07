export interface PaginationResponse<T> {
  data: T[];
  pageIndex: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
