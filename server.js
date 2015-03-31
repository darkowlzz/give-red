//modules and configs
//===============================================
var express = require('express'),
    router  = express.Router(),
    app     = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var port = process.env.PORT || 3000; //port set to 3000

var uristring = process.env.MONGODB_URI || '';
                
mongoose.connect(uristring, function (err, res) {
  if (err) {
    console.log('Error connecting to db');
  } else {
    console.log('Succeeded in connecting to db');
  }
});

var donorSchema = new mongoose.Schema({
  name: { type: String },
  age: { type: Number },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  group: { type: String }
});

var Donor = mongoose.model('donors', donorSchema);

//app specific configurations
//==================================================

app.use('/', express.static(__dirname + '/app/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//router configurations
//============================================

router.get('/', function (req, res) {
	res.render('/index.html');
});

router.post('/submit', function (req, res) {
  var data = req.body.data;
  var aDonor = new Donor({
    name: data.name || '',
    age: data.age || '',
    email: data.email || '',
    phone: data.phone || '',
    address: data.address || '',
    group: data.group || ''
  });
  aDonor.save(function (err, obj) {
    if (err) {
      console.log('Error on save!');
    } else {
      console.log('Saving', obj);
      res.json(obj);
    }
  });
});


app.use('/', router);

//run the server========================
var server = app.listen(port, function(){
	console.log('server has started running at localhost:' + port);
});
