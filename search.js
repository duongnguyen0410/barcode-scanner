const filePath = "data/machine.json";

async function Search(filePath, searchTerm) {

  // Check if searchTerm is empty
  if (!searchTerm.trim()) {
    return;
  }

  // Find the item with the matching searchTerm
  try {
    const response = await fetch(filePath);
    const data = await response.json();

    for (const item of data) {
      if (item.no && item.no === searchTerm) {
        return item; // If found, return the item
      }
    }
  } catch (error) {
    console.error('Error fetching JSON data:', error);
  }
}

function displayResults(result) {
  resultsDiv.innerHTML = ""; // Clear previous results

  if (!result) {
    resultsDiv.textContent = "No results found.";
    return;
  }

  // Create and display result
  const li = document.createElement("li");
  li.innerHTML = `<strong>No:</strong> ${result.no}, <strong>Name:</strong> ${result.name}, <strong>Location:</strong> ${result.location}, <strong>Condition:</strong> ${result.condition}, <strong>Last Checked:</strong> ${result.lastchecked}`;
  resultsDiv.appendChild(li);
}

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultsDiv = document.getElementById("results");

// Handle click event on search button
searchButton.addEventListener("click", async (event) => {
  event.preventDefault(); // Prevent default form submission
  const searchTerm = searchInput.value;
  const searchResult = await Search(filePath, searchTerm);
  displayResults(searchResult);
});

// Clear search input on focus
searchInput.addEventListener('focus', function () {
  this.value = "";
});