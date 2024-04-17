const box = document.getElementById('box');

async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/");
    const data = await response.json();

    console.log(data);
    // Assuming data is a string or can be converted to a string
    box.innerHTML = JSON.stringify(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();
