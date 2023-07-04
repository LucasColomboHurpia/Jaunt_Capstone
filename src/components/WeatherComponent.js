import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const API_KEY = "";

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Vancouver&appid=${API_KEY}`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  if (!weatherData) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const { main, weather, dt } = weatherData;
  const temperatureCelsius = main.temp - 273.15; // Convert from Kelvin to Celsius
  const date = new Date(dt * 1000);
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.weatherBox}>
          <Text
            style={styles.weatherText}
          >{`${dayName} ${formattedTime}`}</Text>
          <Text style={styles.weatherText}>
            {weather[0].main} {`${temperatureCelsius.toFixed(0)}°`}{" "}
            {`H: ${(main.temp_max - 273.15).toFixed(0)}°  L: ${(
              main.temp_min - 273.15
            ).toFixed(0)}°`}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  weatherBox: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  weatherText: {
    fontSize: 18,
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 18,
  },
  background: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
});

export { WeatherComponent };
