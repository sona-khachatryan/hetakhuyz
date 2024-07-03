import './hourlyNewsFeed.style.scss';
import React, {useEffect, useState} from 'react';
import {getAllNews} from "../../../api/fetchData.js";
import {Link} from "react-router-dom";

function HourlyNewsFeed(props) {
    const [news, setNews] = useState([]);

    useEffect(()=>{
        (async () => {
            try {
                const allNews = await getAllNews();
                setNews(allNews.filter(news => news?.newsContent?.file?.isImage).slice(0,6));
            } catch (error) {
                console.log(error)
            }
        })()
    },[])

    useEffect(() => {
        console.log(news)
    }, [news]);

    return (
        <div className='hourly_news_feed_container'>
            <div>
                <h3>Լրահոս</h3>
                <hr/>
            </div>
            <div className='hourly_news_feed'>
                {news?.length ?
                    <>
                        {news.map(singleNews =>
                            <Link key={singleNews.id} to={`/news/${singleNews?.id}`}>
                                <div className='hourly_newsCard'>
                                    <div  className='hourly_newsCard_createdAt'>
                                        <div></div>
                                        <span>{singleNews.createdAt.slice(11, 16)}</span>
                                    </div>
                                    <div className='hourly_newsCard_title'>
                                        {singleNews.title}
                                    </div>
                                </div>
                            </Link>
                       )}
                    </>
                    :
                    ''
                }
            </div>
        </div>
    );
}

export default HourlyNewsFeed;