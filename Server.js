const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// MongoDB connection setup
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
// Connect to the MongoDB server
async function connect() { 
  try {
     await client.connect(); 
     console.log('Connected to MongoDB server');
     } 
     catch (err)
      {
       console.error('Error connecting to MongoDB server', err);
        process.exit(1); 
      }
    }
    app.get('/insert', async function (req, res){ 
      try {
        res.setHeader('content-type','application/json')
        res.setHeader("Access-Control-Allow-Origin","*");
        const db = client.db('Tourism');
        const collection=db.collection('userdata');
      
        const result = await collection.insertOne(req.query);
        console.log(result);
        data={ status:true,message: "Inserted Successfully" };
          res.json(data);
       } 
        catch (err) { 
          console.error('Error ', err); 
          data={ status:false,message: "Insert Failed"};
            res.json(data);
         }
     });
  app.get('/insert1', async function (req, res){
    try {
      console.log("Request Query Parameters:", req.query);
    res.setHeader('content-type','application/json')
    res.setHeader("Access-Control-Allow-Origin","*");
    const db = client.db('Tourism');
    const collection=db.collection('userdata');
    var doc={email:req.query.email,password:req.query.password};
    const user = await collection.findOne(doc);
    if(user){
      data={ status:true,message: "Inserted Successfully" };
      res.json(data);
  
    }
    else{
      data={ status:false,message: "Insert Failed" };
    res.json(data);
    }
    }catch (err) {
        console.error('Error ', err);
        data={ status:false,message: "Insert Failed" };
    res.json(data);
    }
  });
  app.get('/insert2', async function (req, res){ 
    try {
      res.setHeader('content-type','application/json')
      res.setHeader("Access-Control-Allow-Origin","*");
      const db = client.db('Tourism');
      const collection=db.collection('booking');
      console.log(collection);
      const result = await collection.insertOne(req.query);
      console.log(result);
      data={ status:true,message: "Inserted Successfully" };
      res.json(data);
      console.log("helo insert");
     } 
      catch (err) { 
        console.error('Error ', err); 
        data={ status:false,message: "Insert Failed"};
          res.json(data);
       }
   });
   app.get('/delete', async function (req, res) {
    try {
      res.setHeader('content-type', 'application/json');
      res.setHeader("Access-Control-Allow-Origin", "*");
      const db = client.db('Tourism');
      const collection = db.collection('userdata');
  
      // Check if the email exists in the database
      const existingUser = await collection.findOne({ email: req.query.email });
      if (!existingUser) {
        return res.json({ status: false, message: "Email does not exist" });
      }
  
      // If the email exists, proceed with deletion
      const result = await collection.deleteOne({ email: req.query.email });
      console.log(result);
      let data;
      if (result.deletedCount > 0) {
        data = { status: true, message: "Deleted Successfully", noOfDoc: result.deletedCount };
      } else {
        data = { status: false, message: "No data found", noOfDoc: result.deletedCount };
      }
      res.json(data);
    } catch (err) {
      console.error('Error ', err);
      res.status(500).json({ status: false, message: "Delete action failed" });
    }
  });
  
  app.get('/findAll', async function (req, res){
    try {
    res.setHeader('content-type','application/json')
    res.setHeader("Access-Control-Allow-Origin","*");
        const db = client.db('Tourism');
        const collection=db.collection('userdata');		
        const result = await collection.find({},{username:1,_id:0,email:1,password:1}).toArray();
    data={ status:true,message: "Successfully find the docs",list:result };
    res.json(data);
    } catch (err) {
        console.error('Error', err);
        data={ status:false,message: "Failed find the docs"};
    res.json(data);
    }
  });
  app.get('/findAll1', async function (req, res){
    try {
    res.setHeader('content-type','application/json')
    res.setHeader("Access-Control-Allow-Origin","*");
        const db = client.db('Tourism');
        const collection=db.collection('booking');		
        const result = await collection.find({},{_id:0,email:1,packageName:1,packagetype:1,noofpersons:1,selectedslot:1,price:1}).toArray();
    data={ status:true,message: "Successfully find the docs",list:result };
    res.json(data);
    } catch (err) {
        console.error('Error', err);
        data={ status:false,message: "Failed find the docs"};
    res.json(data);
    }
  });
  app.get('/findOne', async function (req, res){
    try {
        const userEmail = req.query.email; // Retrieve email from query parameters
        res.setHeader('content-type', 'application/json');
        res.setHeader("Access-Control-Allow-Origin", "*");
        const db = client.db('Tourism');
        const collection = db.collection('userdata');
        const result = await collection.findOne({ email: userEmail }, { projection: { _id: 0, username: 1, email: 1, password: 1 } });
        console.log(result);
        if (result) {
            const data = { status: true, message: "User found", user: result };
            res.json(data);
        } else {
            const data = { status: false, message: "User not found" };
            res.json(data);
        }
    } catch (err) {
        console.error('Error', err);
        const data = { status: false, message: "Failed to find user" };
        res.json(data);
    }
});
app.get('/findOne1', async function (req, res){
  try {
      const userEmail = req.query.email; // Retrieve email from query parameters
      res.setHeader('content-type', 'application/json');
      res.setHeader("Access-Control-Allow-Origin", "*");
      const db = client.db('Tourism');
      const collection = db.collection('booking');
      const result = await collection.findOne({ email: userEmail }, { projection: { _id: 0, packagetype: 1 } });
      console.log(result);
      if (result) {
          const data = { status: true, message: "User found", user: result };
          res.json(data);
      } else {
          const data = { status: false, message: "User not found" };
          res.json(data);
      }
  } catch (err) {
      console.error('Error', err);
      const data = { status: false, message: "Failed to find user" };
      res.json(data);
  }
});


app.get('/update', async function (req, res) {
  try {
    res.setHeader('content-type', 'application/json')
    res.setHeader("Access-Control-Allow-Origin", "*");
    const db = client.db('Tourism');
    const collection = db.collection('userdata');
    
    // Find user by email
    const filter = { email: req.query.email };
    const user = await collection.findOne(filter);
    if (!user) {
      res.json({ status: false, message: "User not found" });
      return;
    }

    // Update password
    const updateResult = await collection.updateOne(filter, { $set: { password: req.query.password } });

    if (updateResult.modifiedCount > 0)
      res.json({ status: true, message: "Password updated successfully", noOfDoc: updateResult.modifiedCount });
    else
      res.json({ status: false, message: "Failed to update password" });
  } catch (err) {
    console.error('Error ', err);
    res.status(500).json({ status: false, message: "Update action failed" });
  }
});

app.get('/updateuser', async function (req, res) {
  try {
    res.setHeader('content-type', 'application/json')
    res.setHeader("Access-Control-Allow-Origin", "*");
    const db = client.db('Tourism');
    const collection = db.collection('userdata');
    const filter = { email: req.query.email };
    const updateData = {
      $set: {
        username: req.query.username,
        password: req.query.password
      }
    };
    const result = await collection.updateOne(filter, updateData);

    if (result.modifiedCount > 0)
      res.json({ status: true, message: "Updated Successfully", noOfDoc: result.modifiedCount });
    else
      res.json({ status: false, message: "No data found", noOfDoc: result.modifiedCount });
  } catch (err) {
    console.error('Error ', err);
    res.status(500).json({ status: false, message: "Update action failed" });
  }
});
app.get('/updateuser1', async function (req, res) {
  try {
    console.log(req.query);
    res.setHeader('content-type', 'application/json')
    res.setHeader("Access-Control-Allow-Origin", "*");
    const db = client.db('Tourism');
    const collection = db.collection('booking');
    const filter = { email: req.query.email };
    console.log("success");
    const updateData = {
      $set: {
        packagetype: req.query.packagetype,
      }
    };

    const result = await collection.updateOne(filter, updateData);
    //console.log(result);
    if (result.modifiedCount > 0)
      res.json({ status: true, message: "Updated Successfully", noOfDoc: result.modifiedCount });
    else
      res.json({ status: false, message: "No data found", noOfDoc: result.modifiedCount });
  } catch (err) {
    console.error('Error ', err);
    res.status(500).json({ status: false, message: "Update action failed" });
  }
});


      // Start the server
    app.listen(5000, () => {
            console.log('Server running at http://localhost:5000');
            connect(); 
             // Connect to MongoDB when the server starts
    });
