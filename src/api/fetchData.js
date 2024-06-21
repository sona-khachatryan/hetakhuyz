import axios from "axios";
import {address, possibleMainSections} from "../repetitiveVariables/variables.js";

export const getSubsections = async () => {
    const {data} = await axios.get(`${address}/categories/getAll`);
    console.log(data, 'subsections')
    return data;
}

export const getSections = async () => {
    const {data} = await axios.get(`${address}/countries/getAll`);
    console.log(data, 'sections')
    const mainSections = [];
    const countries = [];
    data.forEach(option => {
        if(possibleMainSections.includes(option.title)) {
            mainSections.push(option);
        } else {
            countries.push(option);
        }
    });

    return {mainSections, countries};
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

export const createSections = async (section) => {
    try {
        const formData = new FormData();
        formData.append('title', section);
        const {data} = await axios.post(
            `${address}/countries/create`,
            formData,
            {headers: {
                    Authorization: `bearer ${localStorage.getItem('accessToken')}`,
                }}
            );
        console.log(data, 'created new section')
        // return data;
    } catch (error) {
        console.log(error)
        // return [];
    }
}

export const createSubsections = async (section) => {
    try {
        const formData = new FormData();
        formData.append('title', section);
        const {data} = await axios.post(
            `${address}/categories/create`,
            formData,
            {headers: {
                    Authorization: `bearer ${localStorage.getItem('accessToken')}`,
                }});
        console.log(data, 'created new sub')
        // return data;
    } catch (error) {
        console.log(error)
        // return [];
    }
}

export const getAllNews = async () => {
    try {
        const {data}= await axios.get(`${address}/news/getAll`)
        console.log(data.slice().reverse(), 'allNews')
        return data.slice().reverse();
    } catch (error) {
        console.log(error)
        return [];
    }
}


export const getAllLives = async () => {
    try {
        const {data}= await axios.get(`${address}/live/getAll`)
        console.log(data.slice().reverse(), 'allLives')
        return data.slice().reverse();
    } catch (error) {
        console.log(error)
        return [];
    }
}

export const getNewsBySectionId = async (countryId, categoryId = '') => {
    try {
        const {data}= await axios.get(`${address}/news/filter`, {params: {countryId, categoryId}});
        console.log(data.slice().reverse(), 'news by section id')
        return data.slice().reverse();
    } catch (error) {
        console.log(error)
        return [];
    }
}


export const getDataToEdit = async (selectedSection, selectedSub, selectedNewsType) => {
    // console.log(selectedSection, selectedSub, selectedNewsType)
    if(selectedSection.title === 'Բոլորը' &&  selectedNewsType.title === 'Բոլորը') {
       let allNews = await getAllNews();
       let lives = await getAllLives();
        return [...allNews, ...lives];
    }

    if(selectedNewsType.title === 'Ուղիղ եթեր') {
        return await getAllLives();
    }

    if(selectedSection.title === 'Հայաստան' && selectedSub.title) {
        if(selectedSub.title === 'Բոլորը') {
            return await getNewsBySectionId(selectedSection.id);
        } else {
            return await getNewsBySectionId(selectedSection.id, selectedSub.id);
        }
    }

    if(selectedSection.title === 'Տարածաշրջան' && selectedSub.title) {
        if(selectedSub.title === 'Բոլորը') {
             const regionAll =  await getSections()
               .then(res => {
                   return res.countries.reduce((data, country) => {
                       getNewsBySectionId(country.id).then(res => data.push(...res));
                       return data;
                   }, [])
               })
            console.log(regionAll, regionAll.length)
            // const data = [];
            // const sections = await getSections();
            // await sections.countries.forEach(async (country) => {
            //    const region = await getNewsBySectionId(country.id);
            //     console.log(...region)
            //     data.push(...region);
            // });
            // console.log(data.length);
            // return data;
        } else {
            return await getNewsBySectionId(selectedSub.id);
        }
    }

    if(selectedSection.title === 'Միջազգային') {
        return await getNewsBySectionId(selectedSection.id);
    }
}


