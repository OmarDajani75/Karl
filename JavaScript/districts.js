"use strict";

async function getAllRecords() {
  let getResultElement = document.getElementById("districts");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patt7opCgWoejaoBk.c2d1712a8206278b980e3b275d569e7fbe55ef400e5d5b2368700b4c321e45d1`,
    },
  };

  await fetch(`https://api.airtable.com/v0/appJQG4D9GOUKXugK/Karl`, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      
      getResultElement.innerHTML = "";

      let newHTML = "";

      for (let i = 0; i < data.records.length; i++) {
        let areaPicture = data.records[i].fields["Picture"];
        let areaName = data.records[i].fields["Area Name"];
        // let areaBlurb = data.records[i].fields["Blurbs"];
        // let averageTemperature = data.records[i].fields["Average Temperature"];
        // let fogFrequency = data.records[i].fields["Fog Frequency"];
        // let windSpeeds = data.records[i].fields["Wind Speeds"];
        // let humidity = data.records[i].fields["Humidity"];
        // let historicalTemperature = data.records[i].fields["Historical Temperature"];
        // let currentTemperature = data.records[i].fields["Current Temperature"];

        newHtml += `

        <div class="col-xl-4 cardImageText">
          <div class="card list move border-dark mb-5" style="width: 20rem;">
          <a href="districts.html?id=${
            data.records[i].id
          }">${
          areaPicture
            ? `<img class="card-img-top rounded" alt="${areaName}" src="${areaPicture[0].url}">`
            : ``
        }
          </a>
          <p hidden class="card-key">${areaName}</p>
          </div>
          </div>
        </div>
        
        
        `;
      }

      getResultElement.innerHTML = newHtml;
    });
}

// Create a MediaQueryList object
var x = window.matchMedia("(max-width: 1100px)")

// Attach listener function on state changes
x.addEventListener("change", function() {
  myFunction(x);
});

// function for our detail view
async function getOneRecord(id) {
  let jobsResultElement = document.getElementById("districts");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patt7opCgWoejaoBk.c2d1712a8206278b980e3b275d569e7fbe55ef400e5d5b2368700b4c321e45d1`,
    },
  };

  await fetch(`https://api.airtable.com/v0/appJQG4D9GOUKXugK/Karl/${id}`, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      let picture = data.fields["Picture"];
      let name = data.fields["Area Name"];
      let blurb = data.fields["Blurbs"];
      let average = data.fields["Average Temperature"];
      let fog = data.fields["Fog Frequency"];
      let wind = data.fields["Wind Speeds"];
      let humidity = data.fields["Humidity"];
      let historical = data.fields["Historical Temperature"];
      let current = data.fields["Current Temperature"];

      let newHtml = `
        <div class="card list mb-3">
  <div class="row g-0">
    <div class="col-md-4 d-flex justify-content-center align-items-center">
     ${
       picture
         ? `<img class="img-fluid back ms-4" alt="${name}" src="${picture[0].url}">`
         : ``
     }
    </div>
    <div class="col-md-6 d-flex justify-content-center align-items-center desc">
      <div class="card-body">
        <h5 class="card-title bar">${name}</h5>
        <p class="card-text">${blurb}</p>
      </div>
    </div>
  </div>
</div>

<div class="card list mb-3">
  <div class="row g-0">
    <div class="col-md-4 d-flex justify-content-center ">
    ${
      picture
        ? `<img class="img-fluid front" alt="${name}" src="${picture[0].url}">`
        : ``
    }
     
    </div>
  </div>
</div>
<div class="moves">
<table class="table misc">
    <tbody>
    <tr>
      <th scope="row misc">Average Temperature</th>
      <td class="card-text">${average}</td>
    </tr>
    <tr>
      <th scope="row misc">Fog Frequency</th>
      <td colspan="2">${formattedString(fog)}</td>
    </tr>
     <tr>
      <th scope="row misc">Wind Speeds</th>
      <td colspan="2">${formattedString(wind)}</td>
    </tr>
    <tr>
      <th scope="row misc">Humidity</th>
      <td colspan="2">${formattedString(humidity)}</td>
    </tr>
    <tr>
      <th scope="row misc">Historical Temperature</th>
      <td colspan="2">${formattedString(historical)}</td>
    </tr>
    <tr>
      <th scope="row misc">Wind Speeds</th>
      <td colspan="2">${formattedString(current)}</td>
    </tr>
  </tbody>
</table>
</div>
</div>
</div>
</div>
</div>
      `;

      jobsResultElement.innerHTML = newHtml;
    });
}

let idParams = window.location.search.split("?id=");
if (idParams.length >= 2) {
  // call function to hide search bar
  myFunction();
  // has at least ["?id=", "OUR ID"]
  getOneRecord(idParams[1]); // create detail view HTML w/ our id
} else {
  // Call listener function to hide search bar for mobile devices
  myNeighborhood(x);
  getAllRecords(); // no id given, fetch summaries
}