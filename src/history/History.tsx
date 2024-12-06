import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

import Api from "../Api";
import { HistoryRecord } from "../utils/interfaces";
import { parseWeatherData } from "../utils/parsers"; // Import the parser function

const History: React.FC = () => {
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await Api.get("/history");
        // Parse weatherData JSON string to object
        const parsedData: HistoryRecord[] = response.data.map(
          (
            record: Omit<HistoryRecord, "weatherData"> & { weatherData: string }
          ) => ({
            ...record,
            weatherData: parseWeatherData(record.weatherData),
          })
        );
        setHistory(parsedData);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        {"Search History"}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{"City Name"}</TableCell>
              <TableCell>{"Date"}</TableCell>
              <TableCell>{"Country"}</TableCell>
              <TableCell>{"Temperature"}</TableCell>
              <TableCell>{"Humidity"}</TableCell>
              <TableCell>{"Wind Speed"}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.cityName}</TableCell>
                <TableCell>
                  {new Date(record.queryDate).toLocaleString()}
                </TableCell>
                <TableCell>{record.weatherData.sys.country}</TableCell>
                <TableCell>{`${record.weatherData.main.temp} °C`}</TableCell>
                <TableCell>{`${record.weatherData.main.humidity} %`}</TableCell>
                <TableCell>{`${record.weatherData.wind.speed} m/s`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="secondary"
        style={{ marginTop: 15 }}
      >
        {"Search"}
      </Button>
    </Container>
  );
};

export default History;
