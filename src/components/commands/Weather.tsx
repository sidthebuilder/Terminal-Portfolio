import React, { useEffect, useState } from "react";
import { Wrapper } from "../styles/Output.styled";

const Weather: React.FC = () => {
    const [weather, setWeather] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const res = await fetch(
                        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
                    );
                    const data = await res.json();
                    setWeather(data.current_weather);
                } catch (err) {
                    setError("Failed to fetch weather data.");
                } finally {
                    setLoading(false);
                }
            },
            () => {
                setError("Location access denied or unavailable.");
                setLoading(false);
            }
        );
    }, []);

    if (loading) return <Wrapper>Scanning atmospheric sensors...</Wrapper>;
    if (error) return <Wrapper style={{ color: "red" }}>Error: {error}</Wrapper>;

    const getIcon = (code: number) => {
        if (code <= 1) return "☀️ Clear";
        if (code <= 3) return "⛅ Partly Cloudy";
        if (code <= 60) return "🌧️ Rain";
        return "🌨️ Snow/Other";
    }

    return (
        <Wrapper data-testid="weather">
            <div style={{ marginBottom: "0.5rem", fontWeight: "bold", color: "#4af626" }}>
                LOCAL ATMOSPHERIC REPORT
            </div>
            <div>---------------------------</div>
            <div>
                TEMPERATURE      : <span style={{ color: "#f2a" }}>{weather.temperature}°C</span>
            </div>
            <div>
                WIND SPEED       : <span style={{ color: "#f2a" }}>{weather.windspeed} km/h</span>
            </div>
            <div>
                KEY              : <span style={{ color: "#4af626" }}>{getIcon(weather.weathercode)}</span>
            </div>
            <div>---------------------------</div>
        </Wrapper>
    );
};

export default Weather;
