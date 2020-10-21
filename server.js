let express = require('express'),
   path = require('path'),
   mongoose = require('mongoose'),
   cors = require('cors'),
   bodyParser = require('body-parser'),
   dbConfig = require('./database/db');


// Connection with mongo db
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
   useNewUrlParser: true
}).then(() => {
      console.log('Database sucessfully connected')
   },
   error => {
      console.log('Database could not connected: ' + error)
   }
)
// Configuration du port avec express js
const taskRoute = require('./routes/task-route')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(cors()); 
app.use(express.static(path.join(__dirname, 'dist/application-crud')));
app.use('/', express.static(path.join(__dirname, 'dist/application-crud')));
app.use('/api', taskRoute)

// Creation port
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})


// gestionnaire d'erreurs
app.use(function (err, req, res, next) {
  console.error(err.message); 
  if (!err.statusCode) err.statusCode = 500; 
  res.status(err.statusCode).send(err.message); 
});
