import {useContext, useEffect, useRef, useState} from 'react';
import {CalendarDateContext} from "../../../App.jsx";
import './calendarNewsFeed.style.scss';
import {getDateSpecificNews} from "../../../api/fetchData.js";
import dayjs from "dayjs";
import {address, handleDate, monthsFullName} from "../../../repetitiveVariables/variables.js";
import Pagination from "../../pagination/Pagination.jsx";
import {Link} from "react-router-dom";
import SingleNewsCard from "../../singleNewsCard/SingleNewsCard.jsx";

function CalendarNewsFeed(props) {
    const now = dayjs();
    const [{formattedDate, dateInArm}, setCalendarDate] = useContext(CalendarDateContext);
    const [calendarFeed, setCalendarFeed] = useState();
    const [contentBeginning,setContentBegining] = useState(0);
    const containerRef = useRef(null);

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

    useEffect(()=>{
        containerRef.current.scrollIntoView({behavior:"smooth", block: "start"})
    },[contentBeginning])

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
                                <SingleNewsCard key={index} news={news} index={index} path={`/news/${news?.id}`}/>
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