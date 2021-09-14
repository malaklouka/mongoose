const express = require('express')
const app = express()
const port = process.env.PORT || 6000

const connexion = require('./BD/connexion')
const users = require('./users')

connexion()
   
let mongoose = require('mongoose')

//creating person schema
const personSchema = new mongoose.Schema({
id:{
    type:Number,
     unique:true
    },

name :{ 
     type: String,
    required: true,
    default: 'Malak'
},

age:{
        type: Number,
        default: 25
    },
favoriteFoods: {
        type: [String],
      },

})

//Creating model 
const Person = mongoose.model("Person", personSchema)

//Record of a model
const User = new Person({
    id: 1,
    name: 'MALAK',
    age: 25,
    favoriteFoods: ['paella', 'pizza']
})

// Saving Record of a Model 
User.save((err) => {
        err ? console.log('Error', err) : console.log('this user is added')
       })

       //Creating Many Records 

  Person.create(users)
     .then(console.log('Users are added successfully'))
     .catch((err) => console.log('error'))

 //Searching Database
 Person.find({ name: 'rihem'}, function (err, res) {
    err ? console.log('Error', err) : console.log(res)
})

//Finding just one person which has a certain food in the favouriteFoods
let favfood='pizza'
Person.findOne({favoriteFoods: favfood}),function(err,res){
    err ? console.log('Error', err) : console.log(res)
}

//Finding person by id
let personId = 3
Person.findById( personId, function(err, res) {
    err ? console.log('Error', err) : console.log(res)
})

//Perform Classic Updates by Running Find, Edit, then Save

 const PersonId = { id:2 }

 Person.findById(PersonId).then((res) => {
     console.log(res)
  res.favoriteFoods.push('Hamburger')
 console.log('your favouriteFoods is updated successfully')
      res.save()
      })
      .catch((err) => console.log(err))

      // Performing new updates
const personName = 'nidhal'
Person.findOneAndUpdate(
    {name: personName},
    {$set: {age: 20}},
    {new: true}
)

//Deleting one doc
Person.findByIdAndRemove(personId, (err) => {
      err ? console.log('Error', err) : console.log('Person removed')
       })

       //Deleting many doc
let person_Name = 'Mary'
Person.remove({name: person_Name}, function (err, res){
    err ? console.log('Error', err) : console.log('Mary is removed')
})

//Chain Search Query Helpers to Narrow Search Results
const chainSearch = "cheesenaan";
Person.find({ favoriteFoods: chainSearch })
  .sort({ name: 1 })
  .limit(2)
  .select({age:0})
  .exec((err, data) =>
    err
      ? console.error("error", err)
      : console.log('people who like burritos:', data)
  );

  //PORT 
app.listen(port, (err) => err? console.log("failed to run the server"):console.log(`App running on port ${port}!`))
