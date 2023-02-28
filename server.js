// include package
const express = require("express");
// init package
const app = express();
const path = require("path");
const axios = require("axios");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
async function makeRequest() {
  const config = [
    {
      method: "get",
      url: "https://pokeapi.co/api/v2/pokemon/ditto",
    },
    {
      method: "get",
      url: "https://pokeapi.co/api/v2/pokemon/pikachu",
    },
    {
      method: "get",
      url: "https://pokeapi.co/api/v2/pokemon/ivysaur",
    },
  ];

  let response = await axios(config[0]);
  let apiRes = await axios(config[1]);
  let apiResponse = await axios(config[2]);
  app.get("/", (req, res) => {
    res.render("pokemon", {
      title: "Pokemons",
      pokemon1: [
        {
          names: `Pokemon Name: ${response.data.name}`,
          order: `Pokemon Order: ${response.data.order}`,
        },
      ],
      pokemon2: [
        {
          names: `Pokemon Name: ${apiRes.data.name}`,
          order: `Pokemon Order: ${apiRes.data.order}`,
        },
      ],
      pokemon3: [
        {
          names: `Pokemon Name: ${apiResponse.data.name}`,
          order: `Pokemon Order: ${apiResponse.data.order}`,
        },
      ],
    });
  });
}

makeRequest();

app.listen(3000, () => {
  console.log("Server started on port 3000");
  console.log("http://localhost:3000");
});
