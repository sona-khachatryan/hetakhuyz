import axios from "axios";
import {address} from "../repetitiveVariables/variables.js";

export const getDateSpecificNews = async (dateString) => {
    try {
        const {data}= await axios.get(`${address}/news/calendar?date=${dateString}`)
        console.log(data);
    } catch (error) {
        console.log(error)
    }
}