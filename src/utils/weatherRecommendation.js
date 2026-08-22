const RAINY_CONDITIONS = [
  "rain",
  "drizzle",
  "freezing_rain",
  "showers",
  "thunderstorm",
];

const LABELS = {
  snow: "Snow Alert",
  rain: "Rain Alert",
  fog: "Fog Alert",
  hot: "Hot Day",
  cold: "Cold Day",
  warm: "Warm Day",
  sunny: "Sunny Day",
  cloudy: "Cloudy Day",
  pleasant: "Perfect Day",
};

function build(type, text) {
  return { type, label: LABELS[type], text };
}

export function getWeatherRecommendation(weather) {
  if (!weather) return null;

  const { condition, temperature } = weather;
  console.log(weather);

  if (condition === "snow") {
    return build(
      "snow",
      "It's snowing. Wear warm clothes and take it slow outside.",
    );
  }
  if (RAINY_CONDITIONS.includes(condition)) {
    return build(
      "rain",
      "It's raining. Don't forget to take an umbrella with you.",
    );
  }
  if (condition === "fog") {
    return build(
      "fog",
      "It's foggy. Drive carefully and keep some distance from other vehicles.",
    );
  }
  if (temperature >= 32) {
    return build("hot", "It's quite hot today. Take a water bottle with you.");
  }
  if (temperature <= 15) {
    return build(
      "cold",
      "It's cold today. Wear warm clothes before heading out.",
    );
  }
  if (temperature >= 28) {
    return build("warm", "It's warm today. Take some water with you.");
  }
  if (condition === "clear") {
    return build(
      "sunny",
      "Sunny skies ahead. Take water and consider carrying sunglasses.",
    );
  }
  if (condition === "partly_cloudy" || condition === "cloudy") {
    return build(
      "cloudy",
      "Mostly cloudy today. A light jacket might come in handy.",
    );
  }
  return build(
    "pleasant",
    "The weather looks comfortable today. Enjoy your day!",
  );
}
