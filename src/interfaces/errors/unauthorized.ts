import { BadRequest } from "./badrequest";

export interface UnAuthorized extends BadRequest {
    error: string,
}