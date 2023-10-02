// index.js or any other main JavaScript file
const fetchData = require('./fetchData');

(async () => {
  try {
    const query = 'ecopetrol';
    const response = await fetchData(query);
    console.log('Response:', response);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();