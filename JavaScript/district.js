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
      <div class="card-container">
        <div class="card-flip">
          <div class="card front">
            ${
              picture
                ? `<img class="img-fluid back ms-4" alt="${name}" src="${picture[0].url}">`
                : `<div class="card-placeholder">No Image Available</div>`
            }
            <h5 class="card-title">${name || "Unknown District"}</h5>
            <p>${blurb || "No description available."}</p>
            <button class="flip-button">View Details</button>
          </div>
          <div class="card back">
            <h5 class="card-title">${name || "Unknown District"}</h5>
            <p><strong>Average Temperature:</strong> ${formattedString(average)}</p>
            <p><strong>Fog Frequency:</strong> ${formattedString(fog)}</p>
            <p><strong>Wind Speeds:</strong> ${formattedString(wind)}</p>
            <p><strong>Humidity:</strong> ${formattedString(humidity)}</p>
            <p><strong>Historical Temperature:</strong> ${formattedString(historical)}</p>
            <button class="flip-button">Back</button>
          </div>
        </div>
      </div>
    `;

    jobsResultElement.innerHTML = newHTML;

    // Add event listeners for flip functionality
    document.querySelectorAll('.flip-button').forEach((button) => {
      button.addEventListener('click', (e) => {
        const card = e.target.closest('.card-flip');
        card.classList.toggle('flipped');
      });
    });
  } catch (error) {
    console.error("Error fetching district details:", error);
    jobsResultElement.innerHTML =
      "<p>Error loading district details. Please try again later.</p>";
  }
}