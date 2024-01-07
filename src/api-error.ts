import { StatusCodeEnum } from "./status-code";

export interface ApiError {
    message: string;
    statusCode: StatusCodeEnum;
}
