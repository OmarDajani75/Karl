"use strict";

// Helper function to handle undefined or missing values
function formattedString(value) {
  return value ? value : "No data available";
}

// Function to fetch and display all districts
async function getAllRecords() {
  let getResultElement = document.getElementById("districts");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patt7opCgWoejaoBk.c2d1712a8206278b980e3b275d569e7fbe55ef400e5d5b2368700b4c321e45d1`,
    },
  };

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/appJQG4D9GOUKXugK/Karl`,
      options
    );
    const data = await response.json();
    console.log("All Records Data: ", data);

    // Reset the content of the districts container
    getResultElement.innerHTML = "";

    let newHTML = "";

    data.records.forEach((record) => {
      const areaPicture = record.fields["Picture"];
      const areaName = record.fields["Area Name"];
      const recordId = record.id;

      newHTML += `
        <div class="col-xl-4 cardImageText">
          <div class="card list move border-dark mb-5" style="width: 20rem;">
            <a href="districts.html?id=${recordId}">
              ${
                areaPicture
                  ? `<img class="card-img-top rounded" alt="${areaName}" src="${areaPicture[0].url}">`
                  : `<div class="card-placeholder">No Image Available</div>`
              }
            </a>
            <p hidden class="card-key">${areaName}</p>
          </div>
        </div>
      `;
    });

    getResultElement.innerHTML = newHTML;
  } catch (error) {
    console.error("Error fetching all districts:", error);
    getResultElement.innerHTML =
      "<p>Error loading districts. Please try again later.</p>";
  }
}

// Function to fetch and display a single district's details
async function getOneRecord(id) {
  let jobsResultElement = document.getElementById("districts");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patt7opCgWoejaoBk.c2d1712a8206278b980e3b275d569e7fbe55ef400e5d5b2368700b4c321e45d1`,
    },
  };

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/appJQG4D9GOUKXugK/Karl/${id}`,
      options
    );
    const data = await response.json();
    console.log("Detailed View Data: ", data);

    if (!data.fields) {
      jobsResultElement.innerHTML = "<p>No data found for this district.</p>";
      return;
    }

    const {
      Picture: picture,
      "Area Name": name,
      Blurbs: blurb,
      "Average Temperature": average,
      "Fog Frequency": fog,
      "Wind Speeds": wind,
      Humidity: humidity,
      "Historical Temperature": historical,
      "Current Temperature": current,
    } = data.fields;

    let newHTML = `
      <div class="card list mb-3">
        <div class="row g-0">
          <div class="col-md-4 d-flex justify-content-center align-items-center">
            ${
              picture
                ? `<img class="img-fluid back ms-4" alt="${name}" src="${picture[0].url}">`
                : `<div class="card-placeholder">No Image Available</div>`
            }
          </div>
          <div class="col-md-6 d-flex justify-content-center align-items-center desc">
            <div class="card-body">
              <h5 class="card-title bar">${name || "Unknown District"}</h5>
              <p class="card-text">${blurb || "No description available."}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="moves">
        <table class="table misc">
          <tbody>
            <tr>
              <th scope="row misc">Average Temperature</th>
              <td>${formattedString(average)}</td>
            </tr>
            <tr>
              <th scope="row misc">Fog Frequency</th>
              <td>${formattedString(fog)}</td>
            </tr>
            <tr>
              <th scope="row misc">Wind Speeds</th>
              <td>${formattedString(wind)}</td>
            </tr>
            <tr>
              <th scope="row misc">Humidity</th>
              <td>${formattedString(humidity)}</td>
            </tr>
            <tr>
              <th scope="row misc">Historical Temperature</th>
              <td>${formattedString(historical)}</td>
            </tr>
            <tr>
              <th scope="row misc">Current Temperature</th>
              <td>${formattedString(current)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    jobsResultElement.innerHTML = newHTML;
  } catch (error) {
    console.error("Error fetching district details:", error);
    jobsResultElement.innerHTML =
      "<p>Error loading district details. Please try again later.</p>";
  }
}

// Check if an ID is provided in the URL to load detail view or summary
const idParams = window.location.search.split("?id=");
if (idParams.length >= 2) {
  getOneRecord(idParams[1]); // Create detail view with the provided ID
} else {
  getAllRecords(); // Fetch all records for summary view
}

// MediaQuery listener for responsiveness
var x = window.matchMedia("(max-width: 1100px)");
x.addEventListener("change", function () {
  myFunction(x);
});

function myFunction(x) {
  if (x.matches) {
    console.log("Mobile view activated");
    // Add mobile-specific behavior if needed
  } else {
    console.log("Desktop view activated");
    // Add desktop-specific behavior if needed
  }
}