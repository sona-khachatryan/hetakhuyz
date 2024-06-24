import './singleNewsCard.style.scss';
import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {address, handleDate} from "../../repetitiveVariables/variables.js";

function SingleNewsCard({news, index, path}) {
    const [sliceAt, setSliceAt] = useState({});

    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth >= 300 && window.innerWidth <= 440) {
                setSliceAt({title: 30, desc: 40})
            } else if (window.innerWidth > 440 && window.innerWidth <= 768) {
                setSliceAt({title: 55, desc: 60})
            } else if (window.innerWidth > 768 && window.innerWidth <= 1024) {
                setSliceAt({title: 70, desc: 70})
            }  else if (window.innerWidth > 1024 && window.innerWidth <= 1440) {
                setSliceAt({title: 80, desc: 90})
            } else if (window.innerWidth > 1440) {
                setSliceAt({title: 100, desc: 100})
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <Link to={path}>
            <div key={index} className='single_news-card'>
                {<img src={news?.img ? `${address}/${news?.img}` : '/img/Hetaxuyz%20LOGO.svg'} className={news?.img ? '' : 'logo-as-img'} alt="Լրատվական նկար"/>}
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