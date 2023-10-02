// fetchData.js
const axios = require('axios');

//const api_key = "j8-Rju4ZargD8PuR21CX2mGG9OcbZdozMWh-gZ3FLodrAzFuGF-y7Q==";
//const azureFunctionUrl = `https://func-llm-ecp-sbx.azurewebsites.net/api/HttpTrigger1_API?code=${api_key}`;
//const azureFunctionUrl =`https://am-ecp-llm.azure-api.net/func-llm-ecp-sbx/HttpTrigger1_API?code=${api_key}`
const url ="https://am-ecp-llm.azure-api.net/func-llm-ecp-sbx/HttpTrigger1_API"

const azureFunctionUrl = "https://am-ecp-llm.azure-api.net/func-llm-ecp-sbx/HttpTrigger1_API"
const fetchData = async (query) => {
  console.log("llego pregunta ",query)
  const payload = {
    query: query + ". Responde en español y especifica el source."
  };

  try {
    console.log("\nCargando respuesta ...\n");

    const response = await axios.post(url, payload);
    console.log("respuesta ",response)

    if (response.status === 200) {
      const data = response.data;
      //console.log('Respuesta:', data.response);
      return data.response;
    } else {
      console.error('Error:', response.data);
      throw new Error('Something went wrong');
    }
  } catch (error) {
    //console.error('Error:', error.message);
    throw new Error('Something went wrong');
  }
};

module.exports = fetchData;

//export default fetchData;