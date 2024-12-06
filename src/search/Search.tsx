import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";

import Api from "../Api";
import { URLS } from "../utils/constants";
import { WeatherData } from "../utils/interfaces";

const Search: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getWeather = async (city: string) => {
    setIsLoading(true);

    Api.get(URLS.Search(city))
      .then((response) => {
        setWeather(response.data);
        setError(null);
        setIsLoading(false);
      })
      .catch((error: any) => {
        setWeather(null);

        if (error.response) {
          console.error("Server responded with error:", error.response.data);
          if (error.response.status === 404) {
            setError("City not found. Please enter a valid city name.");
          } else if (error.response.status === 401) {
            setError("Unauthorized access.");
          } else {
            setError(
              "An error occurred while fetching the weather data. Please try again later."
            );
          }
        } else if (error.request) {
          console.error("No response received:", error.request);
          setError("Network error, please try again later.");
        } else {
          console.error("Error setting up the request:", error.message);
          setError("An unexpected error occurred. Please try again.");
        }
        setIsLoading(false);
      });
  };

  const handleSearch = () => {
    if (city.trim() !== "") {
      getWeather(city);
    }
    else{
      setError("Please enter a city name.");
    }
  };

  useEffect(() => {
    if (!!error){
      setError(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        {"Weather Search"}
      </Typography>
      <TextField
        label={"Enter City"}
        variant="outlined"
        fullWidth
        value={city}
        onChange={(e) => setCity(e.target.value)}
        margin="normal"
        placeholder="e.g., London"
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Get Weather"
        )}
      </Button>
      {error && (
        <Typography color="error" style={{ marginTop: "1rem" }}>
          {error}
        </Typography>
      )}
      {weather && (
        <Card style={{ marginTop: "2rem" }}>
          <CardContent>
            <Typography variant="h5">
              {weather.name}, {weather.sys.country}
            </Typography>
            <Typography variant="body1">
              {`Temperature: ${weather.main.temp} °C`}
            </Typography>
            <Typography variant="body1">
              {`Weather: `}
              {weather.weather[0].description}
            </Typography>
            <Typography variant="body1">
              {`Humidity: ${weather.main.humidity}%`}
            </Typography>
            <Typography variant="body1">
              {`Wind Speed: ${weather.wind.speed}m/s`}
            </Typography>
          </CardContent>
        </Card>
      )}
      <Button
        component={Link}
        to="/history"
        variant="contained"
        color="secondary"
        style={{ marginTop: weather ? 15 : 0, marginLeft: weather ? 0 : 10 }}
      >
        {"History"}
      </Button>
    </Container>
  );
};

export default Search;
