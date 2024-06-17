import axios from "axios";
import {address} from "../repetitiveVariables/variables.js";

export const getSubsections = async () => {
    const {data} = await axios.get(`${address}/categories/getAll`);
    console.log(data, 'subsections')
    return data;
}

export const getSections = async () => {
    const {data} = await axios.get(`${address}/countries/getAll`);
    console.log(data, 'sections')
    return data;
}
  
export const getDateSpecificNews = async (dateString) => {
    try {
        const {data}= await axios.get(`${address}/news/calendar?date=${dateString}`)
        return data;
    } catch (error) {
        console.log(error)
        return [];
    }
}