
const { Client } = require('pg');
    const client = new Client({
        user: 'postgres',       
        host: 'localhost',     
        database: 'Bhupendra', 
        password: '1234',
        port: 5432,
      });
      const connectDb = async () => {
        try {
          await client.connect();
          console.log("Connected to PostgreSQL successfully");
        } catch (err) {
          console.error("Error connecting to PostgreSQL", err.stack);
        }
      };
      


module.exports={client,connectDb};

