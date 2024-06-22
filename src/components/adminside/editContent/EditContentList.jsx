import './editContent.style.scss';
import React, {useEffect, useState} from 'react';
import SingleNewsCard from "../../singleNewsCard/SingleNewsCard.jsx";
import Pagination from "../../pagination/Pagination.jsx";
import '../../calendar/calendarNewsFeed/calendarNewsFeed.style.scss';

function EditContentList({newsList}) {

    const [contentBeginning,setContentBegining] = useState(0);

    useEffect(() => {
        setContentBegining(0);
    }, [newsList]);

    return (
        <div className='calendar_feed container'>
            <div className='calendar_feed__top'>
                <span className='calendar_feed__result'>
                    {newsList?.length ? `${newsList?.length} արդյունք` : '0 արդյունք'}
                </span>
            </div>
            <div className='calendar_feed__main'>
                {newsList?.length
                    ?
                        <div className='calendar_feed__news'>
                            {newsList.slice(contentBeginning, contentBeginning + 6).map((news, index) =>
                                <SingleNewsCard key={index} news={news} index={index} path={`/new-admin/edit/${news.id}`}/>
                        )}
                            <Pagination totalElements={newsList?.length} contentBeginning={contentBeginning}
                                    setContentBeginning={setContentBegining}/>
                        </div>
                    :
                        <p className='calendar_feed__no-result'>Արդյունք չի գտնվել</p>
                }
            </div>
        </div>
    );
}

export default EditContentList;