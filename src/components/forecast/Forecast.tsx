import React from 'react';
import {WeatherData} from '../../interfaces/interfaces'
import './forecast.scss';


const Forecast = ({data}: { data: WeatherData }) => {

    return (
        <section className="forecast" aria-label="Weather forecast">
            {data.days.map((day, index) => {
                const date = new Date(day.date_time);
                const dayFromDate = date.getDate().toString().padStart(2, '0');
                const monthFromDate = (date.getMonth() + 1).toString().padStart(2, '0');
                const dayOfWeek = date.toLocaleDateString('en-EN', {weekday: 'short'});

                return (
                    <div className="forecast__day" key={index}>

                        <div className="forecast__precipitation">
                            <img className="forecast__precipitation-icon" src={`/assets/icons/${day.symbol_code}.svg`}
                                 alt="Weather icon"/>
                            <span className="forecast__precipitation-percentage">
                                <span className="sr-only">Probability of precipitation: </span>
                                {day.PROBPCP_PERCENT}%
                            </span>
                        </div>

                        <div className="forecast__date">
                            <span className="forecast__date-day">{dayOfWeek}, </span>
                            <span className="forecast__date-value">{`${dayFromDate}.${monthFromDate}`}</span>
                        </div>

                        <div className="forecast__temperature">
                            <span className="forecast__temperature-max">
                                <span className="sr-only">Maximum temperature: </span>
                                {day.max_color.temperature}°C
                            </span>
                            <span className="forecast__temperature-min">
                                 <span className="sr-only">Lowest temperature: </span>
                                {day.min_color.temperature}°C
                            </span>
                        </div>
                    </div>
                );
            })}
        </section>
    );
};

export default Forecast;