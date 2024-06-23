import './editContent.style.scss';
import React, {useContext, useEffect, useState} from 'react';
import SingleNewsCard from "../../singleNewsCard/SingleNewsCard.jsx";
import Pagination from "../../pagination/Pagination.jsx";
import '../../calendar/calendarNewsFeed/calendarNewsFeed.style.scss';
import {SelectedValueContext} from "../adminSideContent/AdminSideContent.jsx";

function EditContentList({newsList}) {

    const [contentBeginning,setContentBegining] = useState(0);
    const selectedStates = useContext(SelectedValueContext);
    const [selectedNewsType] = selectedStates.newsType;

    useEffect(() => {
        setContentBegining(0);
        console.log(selectedNewsType)
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
                                <SingleNewsCard key={index} news={news} index={index} path={selectedNewsType.title==='Ուղիղ եթեր' ? `/new-admin/edit/live/${news.id}` : `/new-admin/edit/${news.id}`}/>
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