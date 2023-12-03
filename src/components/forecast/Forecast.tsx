import React from 'react';
import { WeatherData } from '../../interfaces/interfaces'
import './forecast.scss';


const Forecast = ({ data }: { data: WeatherData }) => {

    return (
            <section className="forecast" aria-label="Weather forecast">
                {data.days.map((day, index) => {
                    const date = new Date(day.date_time);
                    const dayFromDate = date.getDate().toString().padStart(2, '0');
                    const monthFromDate = (date.getMonth() + 1).toString().padStart(2, '0');
                    const dayOfWeek = date.toLocaleDateString('en-EN', { weekday: 'long' });

                    return (
                        <div className="forecast__day" key={index}>
                            <span>{dayOfWeek}, </span><span>{`${dayFromDate}.${monthFromDate}`}</span>
                            {/* For better accessibility create a mapping and pass the value to the alt property */}
                            <img src={`/assets/icons/${day.symbol_code}.svg`} alt="Weather icon"/>
                            <span><span className="sr-only">Maximum temperature: </span>{day.max_color.temperature}°C, </span>
                            <span><span className="sr-only">Lowest temperature: </span>{day.min_color.temperature}°C, </span>
                            <span><span className="sr-only">Probability of precipitation: </span>{day.PROBPCP_PERCENT}%</span>
                        </div>
                    );
                })}
            </section>
    );
};

export default Forecast;