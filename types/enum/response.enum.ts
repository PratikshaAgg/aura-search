export enum StatusCode {
  OK = 200,
  Created = 201,
  Updated = 204,
  SuccessWithNoBody = 204,
  UnAuthorized = 401,
  InternalServerError = 500,
  Exception = 400,
}

export enum ResponseText {
  SUCCESS_WRITE = `Successfully stored`,
  SUCCESS_UPDATED = `Successfully updated`,
  INTERNAL_ERROR = `Internal Server Error`,
  NO_DATA = "No Data Found",
  MONGO_SUCCESS = "MONGO_SUCCESS",
}


