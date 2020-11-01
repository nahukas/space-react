interface ApiError {
  errorCode: string;
  errorMessage: string;
}

export interface ApiResponse {
  errors: ApiError[];
}
