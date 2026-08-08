const { Client } = require('pg'); 
const client = new Client({ connectionString: 'postgresql://postgres:postgres@localhost:5432/astrospacious' }); 
client.connect().then(() => client.query('SELECT * FROM "Category"')).then(res => console.log(res.rows)).finally(() => client.end());
