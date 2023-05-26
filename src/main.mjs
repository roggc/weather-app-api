import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

const corsOptions = {
  origin: ["https://nauseating-sense.surge.sh", "http://localhost:3000"],
};

app.use(cors(corsOptions));

const weatherForecastUrl = "api.openweathermap.org/data/2.5/onecall";
const hereUrl = "geocode.search.hereapi.com";

const getParamsStringForWeatherAPI = (query) =>
  Object.entries(query)
    .reduce((result, [key, value]) => result.concat(`${key}=${value}&`), "")
    .concat(`appid=${process.env.WEATHER_API_KEY}`);

const getParamsStringForHereAPI = (query) =>
  Object.entries(query)
    .reduce((result, [key, value]) => result.concat(`${key}=${value}&`), "")
    .concat(`apiKey=${process.env.HERE_API_KEY}`);

app.get("/current", async (req, res) => {
  const queryString = getParamsStringForWeatherAPI(req.query);
  const resp = await fetch(`https://${weatherForecastUrl}?${queryString}`);
  const data = await resp.json();
  res.json(data);
});

app.get("/timemachine", async (req, res) => {
  const queryString = getParamsStringForWeatherAPI(req.query);
  const resp = await fetch(
    `https://${weatherForecastUrl}/timemachine?${queryString}`
  );
  const data = await resp.json();
  res.json(data);
});

// const firebaseConfig = {
//   apiKey: `${process.env.FIREBASE_API_KEY}`,
//   authDomain: "auth-19f5b.firebaseapp.com",
//   databaseURL: "https://auth-19f5b.firebaseio.com",
//   projectId: "auth-19f5b",
//   storageBucket: "auth-19f5b.appspot.com",
//   messagingSenderId: "1003273919912",
//   appId: "1:1003273919912:web:26f8acbf74b0487112119d",
// };

const firebaseConfig = {
  apiKey: `${process.env.FIREBASE_API_KEY}`,
  authDomain: "totorotos-api.firebaseapp.com",
  databaseURL: "https://totorotos-api.firebaseio.com",
  projectId: "totorotos-api",
  storageBucket: "totorotos-api.appspot.com",
  messagingSenderId: "420388634894",
  appId: "1:420388634894:web:81ab1952fcafbb8df8175f",
  measurementId: "G-Y1RG51YTTR",
};

app.get("/firebase-config", (req, res) => {
  res.json(firebaseConfig);
});

app.get("/here-coordinates", async (req, res) => {
  const queryString = getParamsStringForHereAPI(req.query);
  const resp = await fetch(`https://${hereUrl}/v1/geocode?${queryString}`);
  const data = await resp.json();
  res.json(data);
});

const port = process.env.PORT ?? 4000;

app.listen(port, () => console.log(`server running on port ${port}`));
