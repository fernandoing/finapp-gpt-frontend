const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
  region: 'us-east-1',
});

const ssm = new AWS.SSM();

async function fetchParameters() {
  const params = {
    Names: ['VITE_API_URL', 'VITE_API_LOGIN'], 
    WithDecryption: true,
  };

  try {
    const data = await ssm.getParameters(params).promise();
    const parameters = {};
    data.Parameters.forEach((param) => {
      parameters[param.Name] = param.Value;
    });
    return parameters;
  } catch (err) {
    console.error('Error fetching parameters:', err);
    return {};
  }
}

async function generateConfigFile() {
  const parameters = await fetchParameters();
  const configContent = `export default ${JSON.stringify(parameters, null, 2)};`;
  fs.writeFileSync('src/config.js', configContent);
}

generateConfigFile().then(() => {
  console.log('Config file generated successfully.');
}).catch((err) => {
  console.error('Error generating config file:', err);
});