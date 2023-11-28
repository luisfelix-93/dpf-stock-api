const app = require('./app.js');
const bodyParser = require('body-parser');

const PORT = 8080;
app.listen(PORT);
app.use(bodyParser.json());
console.log(`Application started on port ${PORT}`);