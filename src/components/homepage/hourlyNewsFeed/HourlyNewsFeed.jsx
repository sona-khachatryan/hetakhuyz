import './hourlyNewsFeed.style.scss';
import {useEffect, useState} from 'react';
import {getAllNews} from "../../../api/fetchData.js";
import {Link} from "react-router-dom";

function HourlyNewsFeed(props) {
    const [allNews, setAllNews] = useState([]);
    const [newsToShow, setNewsToShow] = useState([]);

    useEffect(()=>{
        (async () => {
            try {
                const allNews = await getAllNews();
                setAllNews(allNews);
                setNewsToShow(allNews);
            } catch (error) {
                console.log(error)
            }
        })()
    },[])


    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth <= 768){
                setNewsToShow(allNews.slice(0,10))
            } else {
                setNewsToShow(allNews)
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[allNews]);

    return (
        <div className='hourly_news_feed_container'>
            <div>
                <h3>Լրահոս</h3>
                <hr/>
            </div>
            <div className='hourly_news_feed'>
                {newsToShow?.length ?
                    <>
                        {newsToShow.map(singleNews =>
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