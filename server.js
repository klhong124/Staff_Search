const express = require('express');
const { graphql } = require('graphql');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const graphqlHTTP = require('express-graphql');
const table = require('./graphql/table');
const schema = require('./graphql/schema');
const root = require('./graphql/resolver');

const test = express();
const app = express();

//Configuration
  app.use(bodyParser.urlencoded({ extended: true }));

//index
  app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
  });
//Staff Information
  app.get('/staff/:staffid', (req, res) => {
    var staffid = req.params.staffid;
    const staff = require('./staff/html');
    const query = require('./staff/query');

  //Datafetching
  MongoClient.connect("mongodb://localhost:27017/",{ useNewUrlParser: true }, (err, db) => {
    //Create Collection
    db.db("Staffdb").createCollection("Staff", function(err, res) {
        db.close();
    });
    //Collection Find
    db.db("Staffdb").collection("Staff").find({id: staffid}).toArray((err, database) => {
      graphql(schema(table.col), query(staffid,table.col), root(database)).then((response) => {
        var result = response.data.staff
        if (result===null){
          res.send(`
          <script>
            alert("Staff ID does not exist");
            window.location.replace("/");
          </script>`);
        }else{
          const html = staff(result,table.col);
          res.send(html);
        };
        db.close();
        });
      });
    });
  });
//Add Staff
  app.get('/addStaff', (req, res) => {
    const addstaff = require('./addstaff/html');
    const html = addstaff(table)
    res.send(html);
  });
//Skill Search
  app.get('/skill_search', (req, res) => {
    const skillsearch = require('./skillsearch/html');
    const html = skillsearch(table)
    res.send(html);
  });

//Data handlers
  app.post('/search_staffid', (req, res) => {
    res.redirect(`/staff/${req.body.staffid}`);
  });
  app.post('/create_staff', (req, res) => {
    const newstaff = require('./addstaff/newstaff');
    const mutation = require('./addstaff/mutation');
    //Collection InsertOne
    graphql(schema(table.col),mutation(newstaff(req.body,table.col),table.col), root()).then((response) => {
      //DataBase Connect
        MongoClient.connect("mongodb://localhost:27017/",{ useNewUrlParser: true }, (err, db) => {
        //Create Collection
          db.db("Staffdb").createCollection("Staff", function(err, res) {
              db.close();
          });
          db.db("Staffdb").collection("Staff").insertOne(response.data.addStaff, function(err, res) {
            db.close();
          });
        });
    res.redirect(`/staff/${response.data.addStaff.id}`);
    });
  });
  app.post('/search_skill', (req,res) => {
    const skillsearch = require('./skillsearch/result');
    const query = require('./skillsearch/query');
    //Datafetching
    MongoClient.connect("mongodb://localhost:27017/",{ useNewUrlParser: true }, (err, db) => {
    //Create Collection
    db.db("Staffdb").createCollection("Staff", function(err, res) {
        db.close();
    });
    //Collection Find
    db.db("Staffdb").collection("Staff").find().toArray((err, database) => {
      var skills = req.body.skills;
      var skilltable = req.body.skilltable;
      var allstaff = [];
      graphql(schema(table.col), query(skills), root(database)).then((response) => {
        var result = response.data.skill;
        for(var i=0; i<result.length;i++){
          for (var location in skilltable){
            for (var trade in skilltable[location]){
              for (var speciality in skilltable[location][trade]){
                skilltable[location][trade][speciality].area = result[i].skilltable.filter(data => {
                  return data.Location === location
                })[0].trades.filter(data => {
                  return data.Trade === trade
                })[0].specialities.filter(data => {
                  return data.Speciality === speciality
                })[0].skills;
              }
            }
          }
          var jsonskilltable = JSON.stringify(skilltable)
          allstaff.push({id:result[i].id, name:result[i].name, age:result[i].age,skilltable:jsonskilltable});
        }
        const html = skillsearch(allstaff,skills);
        res.send(html);
      });
      db.close();
      });
    });
  });

//Test Server
MongoClient.connect("mongodb://localhost:27017/",{ useNewUrlParser: true }, (err, db) => {
db.db("Staffdb").collection("Staff").find().toArray((err, database) => {
  test.use('/graphql', graphqlHTTP({
    schema: schema(table.col),
    rootValue: root(database),
    graphiql: true,
  }));test.listen(4000);
  db.close();
});
});
module.exports = app;
