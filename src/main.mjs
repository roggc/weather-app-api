import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

const weatherForecastUrl = "api.openweathermap.org/data/2.5/onecall";

const getParamsString = (query) =>
  Object.entries(query)
    .reduce((result, [key, value]) => result.concat(`${key}=${value}&`), "")
    .concat(`appid=${process.env.API_KEY}`);

app.get("/current", async (req, res) => {
  const queryString = getParamsString(req.query);
  const resp = await fetch(`https://${weatherForecastUrl}?${queryString}`);
  const data = await resp.json();
  res.json(data);
});

app.get("/timemachine", async (req, res) => {
  const queryString = getParamsString(req.query);
  const resp = await fetch(
    `https://${weatherForecastUrl}/timemachine?${queryString}`
  );
  const data = await resp.json();
  res.json(data);
});

const port = process.env.PORT ?? 4000;

app.listen(port, () => console.log(`server running on port ${port}`));
