import './singleNewsCard.style.scss';
import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {address, handleDate} from "../../repetitiveVariables/variables.js";

function SingleNewsCard({news, index}) {
    const [sliceAt, setSliceAt] = useState({});

    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth >= 300 && window.innerWidth <= 768) {
                setSliceAt({title: 55, desc: 60})
            } else if (window.innerWidth > 768 && window.innerWidth <= 1024) {
                setSliceAt({title: 70, desc: 70})
            }  else if (window.innerWidth > 1024) {
                setSliceAt({title: 100, desc: 110})
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <Link to={`/news/${news?.id}`}>
            <div key={index} className='single_news-card'>
                {<img src={news?.img ? `${address}/${news?.img}` : '/img/Hetakhuzy LOGO.svg'}
                      alt="Լրատվական նկար"/>}
                <div className='single_news-card__text'>
                    {news?.createdAt ? <p className='single_news-card__date'>
                        {handleDate(news?.createdAt)}
                    </p> : ''}
                    {news?.title ? <p className='single_news-card__title'>
                        {news?.title.length > sliceAt.title ? `${news?.title?.slice(0, sliceAt.title)}...` : news.title}
                    </p> : ''}
                    {news?.description ? <p className='single_news-card__description'>
                        {news?.description.length > sliceAt.desc ? `${news?.description?.slice(0, sliceAt.desc)}...` : news.description}
                    </p> : ''}
                </div>
            </div>
        </Link>
    );
}

export default SingleNewsCard;