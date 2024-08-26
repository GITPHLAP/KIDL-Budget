import { ApiBasePort, ApiBaseURL } from "./envExtractor"

export const ApiPath = () => {
    if (ApiBasePort === "") {
        return `${ApiBaseURL}`
    }
    return `${ApiBaseURL}:${ApiBasePort}`
}