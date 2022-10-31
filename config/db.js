// require("dotenv").config({ path: ".env" });

const connectionstring = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.jbswdn1.mongodb.net/?retryWrites=true&w=majority`;

module.exports = {
  mongoURI: connectionstring,
};
