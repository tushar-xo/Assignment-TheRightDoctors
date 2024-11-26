const express = require("express")
require("dotenv/config");
const {mongoDB} = require("./configuration/dbConfig");
const  router  = require("./routes/personRoutes");

const app = express();
app.use(express.json());
app.use(router);

mongoDB(); // connect DB 
const PORT = 9000;

// run the server 
app.listen(PORT, () => console.log(`server is running on Port ${PORT}`));