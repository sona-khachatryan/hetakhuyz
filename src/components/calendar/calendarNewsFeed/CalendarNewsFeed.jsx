import {useContext, useEffect, useRef, useState} from 'react';
import {CalendarDateContext} from "../../../App.jsx";
import './calendarNewsFeed.style.scss';
import {getDateSpecificNews} from "../../../api/fetchData.js";
import dayjs from "dayjs";
import {address, handleDate, monthsFullName} from "../../../repetitiveVariables/variables.js";
import Pagination from "../../pagination/Pagination.jsx";
import {Link} from "react-router-dom";

function CalendarNewsFeed(props) {
    const now = dayjs();
    const [{formattedDate, dateInArm}, setCalendarDate] = useContext(CalendarDateContext);
    const [calendarFeed, setCalendarFeed] = useState()
    const [screenSize, setScreenSize] = useState();
    const [sliceAt, setSliceAt] = useState({});
    const [contentBeginning,setContentBegining] = useState(0);
    const containerRef = useRef(null);
    
    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth >= 300 && window.innerWidth <= 768) {
                setScreenSize('sm')
                setSliceAt({title: 55, desc: 60})
            } else if (window.innerWidth > 768 && window.innerWidth <= 1024) {
                setScreenSize('md')
                setSliceAt({title: 70, desc: 70})
            }  else if (window.innerWidth > 1024) {
                setScreenSize('lg')
                setSliceAt({title: 100, desc: 110})
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getNews = async () => {
        let feed;
        if(formattedDate === undefined) {
            feed = await getDateSpecificNews(now.format('YYYY-MM-DD'));
        } else {
            feed = await getDateSpecificNews(formattedDate);
        }
        setCalendarFeed(feed.slice().reverse());
        setContentBegining(0);
    }

    useEffect(() => {
        if(formattedDate === undefined) {
            setCalendarDate({formattedDate: now.format('YYYY-MM-DD'), dateInArm:`${monthsFullName[now.month()]}ի ${now.date()}, ${now.year()}`})
        }
        getNews();
    }, [formattedDate, dateInArm]);

    useEffect(() => {
        console.log(calendarFeed)
    }, [calendarFeed]);

    return (
        <div ref={containerRef} className='calendar_feed container'>
            <div className='calendar_feed__top'>
                <span className='calendar_feed__date'>
                    {dateInArm}
                </span>
                <span className='calendar_feed__result'>
                    {calendarFeed?.length ? `${calendarFeed?.length} արդյունք` : '0 արդյունք'}
                </span>
            </div>
            <div className='calendar_feed__main'>
                {calendarFeed?.length
                    ?
                        <div className='calendar_feed__news'>
                            {calendarFeed.slice(contentBeginning, contentBeginning+6).map((news, index) =>
                                <Link to={`/news/${news?.id}`}>
                                    <div key={index} className='calendar_feed__news-card'>
                                        {<img src={news?.img ? `${address}/${news?.img}` : '/img/Hetakhuzy LOGO.svg'}
                                          alt="Լրատվական նկար"/>}
                                        <div className='calendar_feed__news-card__text'>
                                            {news?.createdAt ? <p className='calendar_feed__news-card__date'>
                                                {handleDate(news?.createdAt)}
                                            </p> : ''}
                                            {news?.title ? <p className='calendar_feed__news-card__title'>
                                                {news?.title.length > sliceAt.title ? `${news?.title?.slice(0, sliceAt.title)}...` : news.title}
                                            </p> : ''}
                                            {news?.description ? <p className='calendar_feed__news-card__description'>
                                                {news?.description.length > sliceAt.desc ? `${news?.description?.slice(0, sliceAt.desc)}...` : news.description}
                                            </p> : ''}
                                        </div>
                                    </div>
                                </Link>
                            )}
                            <Pagination totalElements={calendarFeed?.length} contentBeginning={contentBeginning}
                                        setContentBeginning={setContentBegining}/>
                        </div>
                    :
                        <p className='calendar_feed__no-result'>Արդյունք չի գտնվել</p>
                }
            </div>
        </div>
    );
}

export default CalendarNewsFeed;