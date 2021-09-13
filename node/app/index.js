express = require('express');
const dotenv = require('dotenv');
const visitorRouter = require ('./controllers/visitor/visitorRouters')
const cors = require('cors');

dotenv.config();
app = express();

app.use(visitorRouter);
app.use(require('./controllers/society/societyRouters'))
app.use(require('./controllers/visitor_history/visitorHistoryRouters'))

app.use(cors());

app.listen(process.env.PORT || 3000, () =>
  console.log('Example app listening on port ' + process.env.PORT),
);