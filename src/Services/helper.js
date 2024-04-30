import axios from "axios";

const baseURL = "https://localhost:1234/"

export const CustomAxios = axios.create({
    baseURL:baseURL ,
})