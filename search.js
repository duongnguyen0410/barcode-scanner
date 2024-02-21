const filePath = "data/machine.json";

async function Search(filePath, searchTerm) {
  if (!searchTerm.trim()) {
    return null; // Trả về null nếu không có searchTerm
  }

  try {
    const response = await fetch(filePath);
    const data = await response.json();
    // Tìm đối tượng đầu tiên có key "no" phù hợp với searchTerm
    for (const item of data) {
      if (item.no && item.no.includes(searchTerm)) {
        return item; // Trả về ngay lập tức khi tìm thấy
      }
    }
  } catch (error) {
    console.error('Error fetching JSON data:', error);
  }
  
  return null; // Trả về null nếu không tìm thấy
}

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultsDiv = document.getElementById("results");

// Xử lý sự kiện click cho nút "Search"
searchButton.addEventListener("click", async (event) => {
  event.preventDefault(); // Ngăn chặn form được gửi đi
  const searchTerm = searchInput.value;
  if (searchTerm.trim()) { // Kiểm tra xem ô input có không rỗng không
    const searchResults = await Search(filePath, searchTerm);
    displayResults(searchResults);
  }
});

// Làm mới ô input khi nhận focus
searchInput.addEventListener('focus', function() {
  this.value = ""; // Làm trống ô input
});

function displayResults(result) {
  resultsDiv.innerHTML = ""; // Clear previous results
  
  if (!result) {
    resultsDiv.textContent = "No results found.";
    return;
  }

  // Tạo và hiển thị kết quả
  const li = document.createElement("li");
  li.innerHTML = `<strong>No:</strong> ${result.no}, <strong>Name:</strong> ${result.name}, <strong>Location:</strong> ${result.location}, <strong>Condition:</strong> ${result.condition}, <strong>Last Checked:</strong> ${result.lastchecked}`;
  resultsDiv.appendChild(li);
}

