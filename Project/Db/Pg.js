
const { Client } = require('pg');
require("dotenv").config()

    const client = new Client({
        user: process.env.user,       
        host: process.env.host,     
        database: process.env.database, 
        password: process.env.password,
        port: process.env.port,
        ssl: {
          rejectUnauthorized: false,  // Allows the connection even if the certificate is self-signed
        }
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

