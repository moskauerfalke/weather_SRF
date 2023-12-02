import React, { useEffect, useState } from 'react';
import { getToken, getWeatherData } from './apiService';
import axios, { AxiosError } from 'axios';
import mockedForecast from './mocked_forecast.json';

interface WeatherData {
  days: {
    date_time: string;
    max_color: {
      temperature: number;
    };
    min_color: {
      temperature: number;
    };
    PROBPCP_PERCENT: number;
  }[];
  geolocation: {
    default_name: string
  };
}

const App = () => {
  const [forecast, setForecast] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMockUsed, setIsMockUsed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const data = await getWeatherData(token);
        setForecast(data);
        setIsMockUsed(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response && axiosError.response.status === 429) {
            setIsMockUsed(true);
            console.error('Quota limit  exceeded, switching to mock');
            setForecast(mockedForecast);
          } else {
            console.error('Mock hasnt been found because: ', axiosError);
          }
        } else {
          console.error('Some unknown error:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!forecast) return <div>No idea</div>;


  return (
      <>
      {isMockUsed && <div>You see the mocked data!</div>}
        <div>The weather in {forecast.geolocation.default_name}</div>
      <div>
        {forecast.days.map((day, index) => {
          const date = new Date(day.date_time);
          const dayFromDate = date.getUTCDate().toString().padStart(2, '0');
          const monthFromDate = (date.getUTCMonth() + 1).toString().padStart(2, '0');
          const dayOfWeek = date.toLocaleDateString('de-DE', { weekday: 'long' });

          return (
              <div key={index}>
                <span>{dayOfWeek}, </span>
                <span>{`${dayFromDate}.${monthFromDate}`}, </span>
                <span>{day.max_color.temperature}°C, </span>
                <span>{day.min_color.temperature}°C, </span>
                <span>{day.PROBPCP_PERCENT}%</span>
              </div>
          );
        })}
      </div>
      </>
  );
};

export default App;