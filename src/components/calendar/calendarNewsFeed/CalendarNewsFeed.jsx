import {useContext, useEffect, useState} from 'react';
import {CalendarDateContext} from "../../../App.jsx";
import './calendarNewsFeed.style.scss';
import {getDateSpecificNews} from "../../../api/fetchData.js";
import dayjs from "dayjs";
import {address, handleDate, monthsFullName} from "../../../repetitiveVariables/variables.js";

function CalendarNewsFeed(props) {
    const now = dayjs();
    const [{formattedDate, dateInArm}, setCalendarDate] = useContext(CalendarDateContext);
    const [calendarFeed, setCalendarFeed] = useState()

    const getNews = async () => {
        let feed;
        if(formattedDate === undefined) {
            feed = await getDateSpecificNews(now.format('YYYY-MM-DD'));
        } else {
            feed = await getDateSpecificNews(formattedDate);
        }
        setCalendarFeed(feed);
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
        <div className='calendar_feed container'>
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
                        {calendarFeed.map((news, index) => <div key={index} className='calendar_feed__news-card'>
                            <img src={address + "/" + news.img} alt="Լրատվական նկար"/>
                            <div className='calendar_feed__news-card__text'>
                                <p className='calendar_feed__news-card__date'>
                                    {handleDate(news.createdAt)}
                                </p>
                                <p className='calendar_feed__news-card__title'>
                                    {news.title}
                                </p>
                                <p className='calendar_feed__news-card__description'>
                                    {news.description}
                                </p>
                            </div>
                        </div>)}
                    </div>
                    :
                    <p className='calendar_feed__no-result'>Արդյունք չի գտնվել</p>
                }
            </div>
        </div>
    );
}

export default CalendarNewsFeed;