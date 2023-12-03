import React, { useEffect, useState } from 'react';
import { getToken, getWeatherData } from './services/apiService';
import axios, { AxiosError } from 'axios';
import mockedForecast from './mocked_forecast.json';
import Forecast from "./components/forecast/Forecast";
import { WeatherData } from './interfaces/interfaces'
import './styles/main.scss';

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

  if (loading) return <div role="alert" aria-busy="true">Loading weather data...</div>;
  if (!forecast) return <div role="alert">Unable to load weather data. Pls check the console for more details.</div>;


  return (
      <>
       {isMockUsed && <div role="status">You see the mocked data!</div>}
         <h1>The weather in {forecast.geolocation.default_name}</h1>
       {forecast && <Forecast data={forecast} />}
       <footer>This is a footer</footer>
      </>
  );
};

export default App;