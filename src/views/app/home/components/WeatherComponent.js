import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Text from "../../../../shared-components/Text";
import { SunIcon } from "../../../../assets/icons/Icon";

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const API_KEY = "030a06ef3a21f98e9fad039e0133fbbe";

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
          <Text variant = "body" style={styles.weatherText}>
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
    backgroundColor: 'white'

  },
  weatherBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  weatherText: {
    fontSize: 16,
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
