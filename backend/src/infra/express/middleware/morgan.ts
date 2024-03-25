// import morgan from 'morgan';
import morgan = require('morgan');

export default () => {
  return morgan(':method :url :status :res[content-length] - :response-time ms');
};