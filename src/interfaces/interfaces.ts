export interface WeatherData {
    days: {
        symbol_code: number;
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
        default_name: string;
    };
}
