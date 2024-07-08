import './selectMainNews.style.scss';
import React, {useEffect, useState} from 'react';
import {handleDate} from "../../../repetitiveVariables/variables.js";
import {getAllNews} from "../../../api/fetchData.js";

function SelectMainNews(props) {
    
    const [allNews, setAllNews] = useState([]);
    const [selectedNews, setSelectedNews] = useState([133, 134, 135, 136]);

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
    
    return (
        <div className='select-main-news-container'>
            <div className='select-news-all'>
                <p>Բոլոր լուրերը</p>
                <div className='select-all-newsList'>
                    {allNews.map(news => 
                        <div key={news.id} className={`select-main-news_card ${selectedNews.includes(news.id) ? 'selected-card' : ''}`}>
                            <span>{handleDate(news?.createdAt)}</span>
                            <div>{news?.title}</div>
                        </div>
                    )}
                </div>
            </div>
            <div className='select-news-selected'>
                <p>Ընտրված լուրերը {selectedNews.length}/4</p>
                <div className='selected-newsList'>
                    {allNews.filter(news => selectedNews.includes(news.id)).map(news =>
                        <div key={news.id}
                             className={`select-main-news_card ${selectedNews.includes(news.id) ? 'selected-card' : ''}`}>
                            <span>{handleDate(news?.createdAt)}</span>
                            <div>{news?.title}</div>
                        </div>
                    )}
                    <button>Հաստատել</button>
                </div>
            </div>
        </div>
    );
}

export default SelectMainNews;