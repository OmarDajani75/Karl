"use strict";

// Helper function to handle undefined or missing values
function formattedString(value) {
  return value ? value : "No data available";
}

// Function to fetch and display all districts in a 3x4 grid
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

    // Start creating rows
    let newHTML = `<div class="container">`;

    // Process up to 12 records
    const records = data.records.slice(0, 12);

    records.forEach((record, index) => {
      const areaPicture = record.fields["Picture"];
      const areaName = record.fields["Area Name"];
      const recordId = record.id;

      // Start a new row for every 3 cards
      if (index % 3 === 0) {
        newHTML += `<div class="row py-3 justify-content-center">`; // Added 'gy-4' for row spacing
      }

      // Add card content
      newHTML += `
        <div class="col-md-4 d-flex">
          <div class="card h-100 w-100 h-101">
            ${
              areaPicture
                ? `<img src="${areaPicture[0].url}" class="card-img-top" alt="${areaName}">`
                : `<div class="card-placeholder">No Image Available</div>`
            }
            <div class="card-body">
              <h5 class="card-title">${areaName || "Unknown District"}</h5>
              <hr>
              <a href="districts.html?id=${recordId}" class="btn btn-secondary">Learn about this district!</a>
            </div>
          </div>
        </div>
      `;

      // Close the row after 3 cards
      if ((index + 1) % 3 === 0) {
        newHTML += `</div>`;
      }
    });

    // Close the container and any unclosed rows
    newHTML += `</div>`;
    getResultElement.innerHTML = newHTML;
  } catch (error) {
    console.error("Error fetching all districts:", error);
    getResultElement.innerHTML =
      "<p>Error loading districts. Please try again later.</p>";
  }
}

// Function to hide the blurb section
function hideBlurb() {
  const blurbSection = document.getElementById("blurb");
  if (blurbSection) {
    blurbSection.style.display = "none"; // Hide the blurb section
  }
}

// Function to fetch and display a single district's details
async function getOneRecord(id) {
  hideBlurb();
  
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