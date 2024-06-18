import axios from 'axios';
import { Url } from "../URLConfig.js";

const BaseUrl = axios.create({
    baseURL: Url().baseAPI,
});


export default BaseUrl

export const catchApiError = (e) => {
    console.log(e)
    if (e.response) {
        if (e.response.status === 500) {
            return 'serverError'
        } else if (e.response.status === 422) {
            return 'wrongAgentCode'
        } else if (e.response.status === 402) {
            return 'passwordDoesNotMatch'
        } else if (e.response.status === 401) {
            return 'validationError'
        } else {
            console.log(e)
        }
    }
}
