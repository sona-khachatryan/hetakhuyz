import './calendar.style.scss';
import {daysOfWeek} from "../../repetitiveVariables/variables.js";

// eslint-disable-next-line react/prop-types
function Calendar({closeModal}) {

    const onClose = (e) => {
        e.stopPropagation();
        if(e.target.id === 'calendar-container') {
            closeModal();
        }
    }

    return (
        <div className='calendar-container' id='calendar-container' onClick={onClose}>
            <div className='calendar-wrapper'>
                <div className='calendar-content'>
                    <div className='calendar-section'>
                        <span className='month-section'>
                            <img src='/img/arrow.svg' alt='previous month' className='prev-arrow'/>
                            <p className='calendar-heading'>Հունիս</p>
                            <img src='/img/arrow.svg' alt='next month' className='next-arrow'/>
                        </span>
                        <span className='year-section'>
                            <img src='/img/arrow.svg' alt='previous year' className='prev-arrow'/>
                            <p className='calendar-heading'>2024</p>
                            <img src='/img/arrow.svg' alt='next year' className='next-arrow'/>
                        </span>
                    </div>
                    <div className='calendar-section week-section'>
                        {daysOfWeek.map(day => <div key={day} className='weekday'>{day}</div>)}
                    </div>
                    <div className='calendar-section days-section'>
                        {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31].map(date => <div key={date} className='date'>{date}</div>)}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Calendar;