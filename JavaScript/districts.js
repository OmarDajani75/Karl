"use strict";

async function getAllRecords() {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patt7opCgWoejaoBk.c2d1712a8206278b980e3b275d569e7fbe55ef400e5d5b2368700b4c321e45d1`,
    },
  };

  await fetch(`https://api.airtable.com/v0/appJQG4D9GOUKXugK/Weather`, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}