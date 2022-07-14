const http = require("http");
const fs = require("fs");
const apikey = "f87caab5c3e46695de44c038c30aed9a";
const city = "Mumbai";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
// const url2 = `https://api.openweathermap.org/data/2.5/weather?q=${city}, ${countryCode}&appid=${apikey}`;
// const url3 = `https://api.openweathermap.org/data/2.5/weather?q=${city},${stateCode},${countryCode}&appid=${apikey}`;

http
  .createServer((req, res) => {
    var request = require("request");
    request(url, (requ, resp, body) => {
      let apiData = JSON.parse(body);
      let filedata = `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css"
            integrity="sha512-PgQMlq+nqFLV4ylk1gwUOgm6CtIIXkKwaIHp/PAIWHzig/lKZSEGKEysh0TCVbHJXCLN7WetD8TFecIky75ZfQ=="
            crossorigin="anonymous"
            referrerpolicy="no-referrer"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500&display=swap"
            rel="stylesheet"
          />
          <title>Weather App</title>
        </head>
        <style>
          * {
            padding: 0;
            margin: 0;
            /* font-family: "Jost", sans-serif; */
            font-family: "Quicksand", sans-serif;
          }
      
          body {
            background: #f3f2ef;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            height: 100vh;
            width: 100vw;
          }
      
          html,
          body {
            font-size: 62.5%;
            height: 100%;
          }
      
          html {
            background: #eee;
          }
      
          .container {
            display: flex;
            flex-direction: column;
            height: 350px;
            align-items: center;
            justify-content: center;
            border: 2px solid #ffbf00;
            border-radius: 10px;
            padding: 0 50px;
          }
      
          .info {
            width: 100%;
            height: 45%;
            z-index: 4;
          }
      
          .location {
            margin-top: 1.5rem;
            text-align: center;
            font-weight: 800;
            font-size: 3rem;
          }
      
          @keyframes rotates {
            from {
              transform: translateX(-0.5rem);
            }
            to {
              transform: translateX(0.5rem);
            }
          }
      
          #date {
            text-align: center;
            margin-top: 0.5rem;
            color: #57606f;
            font-size: 1.2rem;
            font-weight: 300;
            text-transform: uppercase;
          }
      
          .temp {
            margin-top: 2.5rem;
            text-align: center;
            font-size: 3rem;
          }
      
          .tempmin_max {
            text-align: center;
            margin-top: 0.3rem;
            font-weight: 300;
            font-size: 1.2rem;
            color: #57606f;
          }
      
          #weathercon {
            height: 15%;
            font-size: 3em;
          }
      
          #weathercon .fas {
            font-size: 6rem;
          }
      
          @keyframes fas-anime {
            from {
              transform: scale(1.1);
            }
            to {
              transform: scale(1.5);
            }
          }
      
          @media (max-width: 600px) {
            #weathercon {
              font-size: 5em;
            }
      
            .info {
              font-size: 1.5rem;
            }
          }
      
          body > span {
            width: 100vw;
            text-align: center;
            color: grey;
          }
        </style>
        <body>
          <div class="container">
            <div id="weathercon">
              <i class="fas fa-sun" style="color: #eccc68"></i>
            </div>
            <div class="info">
              <h2 class="location">
                <i class="fas fa-street-view" style="margin-right: 10px"></i>${
                  apiData.name
                },
                ${apiData.sys.country}
              </h2>
              <p id="date">WED | OCT 23 | 10:49AM</p>
              <h1 class="temp">${convertToDegree(apiData.main.temp)}°C</h1>
              <h3 class="tempmin_max">Min ${convertToDegree(
                apiData.main.temp_max
              )}°C | Max ${convertToDegree(apiData.main.temp_min)}°C</h3>
            </div>
          </div>
        </body>
      </html>
      `;
      res.writeHead(200, { "content-type": "text/html" });
      res.write(String(filedata));
      res.end();
    });
  })
  .listen(8080);

const convertToDegree = (kelvin) => {
  return (kelvin - 273.15).toFixed(2);
};
