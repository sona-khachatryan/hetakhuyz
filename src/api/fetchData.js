import axios from "axios";
import {address, possibleMainSections} from "../repetitiveVariables/variables.js";

export const getSubsections = async () => {
    const {data} = await axios.get(`${address}/categories/getAll`);
    console.log(data, 'subsections')
    return data;
}

export const getSections = async () => {
    const {data} = await axios.get(`${address}/countries/getAll`);
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
        console.log(data, 'created new section or country')
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
        console.log(data, 'allNews')
        return data;
    } catch (error) {
        console.log(error)
        return [];
    }
}


export const getAllLives = async () => {
    try {
        const {data}= await axios.get(`${address}/live/getAll`)
        console.log(data, 'allLives')
        return data;
    } catch (error) {
        console.log(error)
        return [];
    }
}

export const getNewsBySectionId = async (countryId, categoryId = '') => {
    try {
        const {data}= await axios.get(`${address}/news/filter`, {params: {countryId, categoryId}});
        console.log(data, 'news by section id');
        return data;
    } catch (error) {
        console.log(error)
        return [];
    }
}


export const getDataToEdit = async (selectedSection, selectedSub, selectedNewsType) => {
    let news;

    if(selectedSection.title === 'Բոլորը') {
         news = await getAllNews();
    }

    if(selectedNewsType.title === 'Ուղիղ եթեր') {
         return await getAllLives();
    }

    if(selectedSection.title === 'Հայաստան' && selectedSub.title) {
        if(selectedSub.title === 'Բոլորը') {
             news = await getNewsBySectionId(selectedSection.id);
        } else {
             news = await getNewsBySectionId(selectedSection.id, selectedSub.id);
        }
    }

    if(selectedSection.title === 'Տարածաշրջան' && selectedSub.title) {
        news = await getNewsBySectionId(selectedSub.id);
    }

    if(selectedSection.title === 'Միջազգային') {
        news = await getNewsBySectionId(selectedSection.id);
    }

    if(selectedNewsType.title === 'Բոլորը') {
        return news
    } else if (selectedNewsType.title === 'Տեքստային') {
       return news?.filter(news => news?.newsContent?.file?.isImage === true)
    } else if (selectedNewsType.title === 'Տեսանյութ') {
      return news?.filter(news => news?.newsContent?.file?.isImage === false)
    }
}

export const getSingleNewsToEdit = async (setCurrentNews, setSection, setSub, setNewsType, id, selectedNewsType = {}) => {
    try {
       if(selectedNewsType?.title && selectedNewsType?.title === 'Ուղիղ եթեր') {
           const {data} = await axios.get(`${address}/live/getAll`);
           setNewsType(selectedNewsType);
           console.log(data.find(live => live.id === +id), 'lives')
           setCurrentNews(data.find(live => live.id === +id));
       } else {
           const {data} = await axios.get(`${address}/news/getOne/${id}`);
           console.log(data, 'editContents')
           setCurrentNews(data);

           if(possibleMainSections.includes(data?.country?.title)) {
               setSection({title: data?.country?.title, id: data?.country?.id});
           } else {
               setSection({title: 'Տարածաշրջան', id: ''});
               setSub({title: data?.country?.title, id: data?.country?.id});
           }

           if(data?.category?.title) {
               setSub({title: data?.category?.title, id: data?.category?.id})
           }

           if(data?.newsContent?.file?.isImage) {
               setNewsType({title:'Տեքստային', id:'text'})
           } else {
               setNewsType({title:"Տեսանյութ", id:'video'})
           }
       }
    } catch (error) {
        console.log(error);
    }
}


