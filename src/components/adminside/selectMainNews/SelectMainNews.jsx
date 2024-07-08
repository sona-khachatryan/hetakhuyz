import './selectMainNews.style.scss';
import React, {useEffect, useState} from 'react';
import {handleDate} from "../../../repetitiveVariables/variables.js";
import {getAllNews} from "../../../api/fetchData.js";

function SelectMainNews(props) {
    
    const [allNews, setAllNews] = useState([]);
    const [selectedNews, setSelectedNews] = useState([]);

    useEffect(()=>{
        (async () => {
            try {
                const allNews = await getAllNews();
                setAllNews(allNews);
            } catch (error) {
                console.log(error)
            }
        })()
    },[]);

    const handleCardClick = (newsId) => {
        if(selectedNews.includes(newsId)) {
            setSelectedNews(selectedNews.filter(id => +id !== +newsId))
        } else {
            setSelectedNews([...selectedNews, newsId])
        }
    }
    
    return (
        <div className='select-main-news-container'>
            <div className='select-news-all'>
                <p>Բոլոր լուրերը</p>
                <div className='select-all-newsList'>
                    {allNews.map(news => 
                        <div key={news.id} className={`select-main-news_card ${selectedNews.includes(news.id) ? 'selected-card' : ''}`} onClick={() => handleCardClick(news.id)}>
                            <span>{handleDate(news?.createdAt)}</span>
                            <div>{news?.title}</div>
                        </div>
                    )}
                </div>
            </div>
            <div className='select-news-selected'>
                <p>Ընտրված լուրերը {selectedNews.length}/4</p>
                <div className='selected-newsList'>
                    <div>
                        {allNews.filter(news => selectedNews.includes(news.id)).map(news =>
                            <div key={news.id}
                                className={`select-main-news_card ${selectedNews.includes(news.id) ? 'selected-card' : ''}`} onClick={() => handleCardClick(news.id)}>
                                <span>{handleDate(news?.createdAt)}</span>
                                <div>{news?.title}</div>
                            </div>
                       )}
                    </div>
                    <button>Հաստատել</button>
                </div>
            </div>
        </div>
    );
}

export default SelectMainNews;