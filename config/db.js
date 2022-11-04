require("dotenv").config();

const connectionstring = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/WriteUp?retryWrites=true&w=majority`;

module.exports = {
  mongoURI: connectionstring,
};
