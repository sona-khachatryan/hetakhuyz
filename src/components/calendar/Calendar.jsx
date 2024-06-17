import './calendar.style.scss';
import {daysOfWeek, months, monthsFullName} from "../../repetitiveVariables/variables.js";
import dayjs from "dayjs";
import {useContext, useEffect, useState} from "react";
import {getDateSpecificNews} from "../../api/fetchData.js";
import {CalendarDateContext} from "../../App.jsx";
import {Link} from "react-router-dom";
// eslint-disable-next-line react/prop-types
function Calendar({closeModal}) {

    const now = dayjs();

    const [monthIndex, setMonthIndex] = useState(now.month());
    const [month, setMonth] = useState(months[monthIndex]);
    const [year, setYear] = useState(now.year());
    const [nextYearDisabled, setNextYearDisabled] = useState(true);
    const [nextMonthDisabled, setNextMonthDisabled] = useState(true);
    const [prevMonthDisabled, setPrevMonthDisabled] = useState(false);
    const [days, setDays] = useState([]);
    const [calendarDate, setCalendarDate] = useContext(CalendarDateContext);

    const formatDate = (selectedYear, selectedMonth, selectedDate) => {
        return now.set('year', selectedYear).set('month', selectedMonth).set('date', selectedDate).format('YYYY-MM-DD');
    }

    useEffect(() => {

    }, []);

    useEffect(() => {
        setMonth(months[monthIndex]);

        if(monthIndex === 0) {
            setPrevMonthDisabled(true);
        } else {
            setPrevMonthDisabled(false);
        }

    }, [monthIndex]);

    useEffect(() => {

        if(year < now.year()) {
            setNextYearDisabled(false);
        } else {
            setNextYearDisabled(true);
        }

        if(year === now.year() && monthIndex >= now.month()) {
            setMonthIndex(now.month());
        }

        if(monthIndex === 11 || year === now.year() && monthIndex === now.month()) {
            setNextMonthDisabled(true);
        } else {
            setNextMonthDisabled(false);
        }

        let days = [];
        const firstDay = now.set('year', year).set('month', monthIndex).startOf('month').day();
        const lastDate = now.set('year', year).set('month', monthIndex).endOf('month').date();

        if(firstDay > 0) {
            for(let i = firstDay; i > 1; i--) {
                days.push({date: '', className: 'empty date'})
            }
        } else {
            for(let i = 7; i > 1; i--) {
                days.push({date: '', className: 'empty date'})
            }
        }

        for(let d = 1; d <= lastDate; d++) {
            if(now.format('YYYY-MM-DD') === formatDate(year, monthIndex, d)) {
                days.push({date: d, className: 'date today'})
            } else {
                days.push({date: d, className: 'date'})
            }
        }

        setDays(days);

    }, [year, monthIndex]);


    const onClose = (e) => {
        e.stopPropagation();
        if(e.target.id === 'calendar-container') {
            closeModal();
        }
    }

    const prevMonth = () => {
        setMonthIndex(monthIndex-1);
    }

    const nextMonth = () => {
        setMonthIndex(monthIndex+1);
    }

    const prevYear = () => {
        setYear(year-1);
    }

    const nextYear = () => {
        setYear(year+1);
    }

    const handleDateClick = async (e) => {
        // const feed = await getDateSpecificNews(formatDate(year, monthIndex, +e.target.innerText));
        const formattedDate = formatDate(year, monthIndex, +e.target.innerText);
        const dateInArm = `${monthsFullName[monthIndex]}ի ${+e.target.innerText}, ${year}`;
        // console.log(feed, 'feed')
        setCalendarDate({formattedDate, dateInArm});
    }

    return (
        <div className='calendar-container' id='calendar-container' onClick={onClose}>
            <div className='calendar-wrapper'>
                <div className='calendar-content'>
                    <div className='calendar-section'>
                        <span className='month-section'>
                            <img src='/img/arrow.svg' alt='previous month' className={`prev-arrow ${prevMonthDisabled ? 'disabled-arrow' : ''}`} onClick={prevMonthDisabled ? null : prevMonth}/>
                            <p className='calendar-heading'>{month}</p>
                            <img src='/img/arrow.svg' alt='next month' className={`next-arrow ${nextMonthDisabled ? 'disabled-arrow' : ''}`} onClick={nextMonthDisabled ? null : nextMonth}/>
                        </span>
                        <span className='year-section'>
                            <img src='/img/arrow.svg' alt='previous year' className='prev-arrow' onClick={prevYear}/>
                            <p className='calendar-heading'>{year}</p>
                            <img src='/img/arrow.svg' alt='next year' className={`next-arrow ${nextYearDisabled ? 'disabled-arrow' : ''}`} onClick={nextYearDisabled ? null : nextYear}/>
                        </span>
                    </div>
                    <div className='calendar-section week-section'>
                        {daysOfWeek.map(day => <div key={day} className='weekday'>{day}</div>)}
                    </div>
                    <div className='calendar-section days-section'>
                        {days.map((day, index) => <Link key={index} to={'/calendar'} className={day.className} onClick={day.date ? handleDateClick : null}>{day.date}</Link>)}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Calendar;