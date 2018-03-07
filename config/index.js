const port = 4000 || process.env.PORT;
const mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost';

const mongodb = {
  mongodbUrl: `${mongodbUrl}/keep`,
};

module.exports = {
  port,
  mongodb,
};
