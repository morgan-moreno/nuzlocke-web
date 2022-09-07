export interface BaseResponse<T> {
  success: boolean;
  data: T;
}

export interface SuccessResponse<T> extends BaseResponse<T> {
  success: true;
}
