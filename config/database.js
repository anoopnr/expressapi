const mongoose=require('mongoose');
const {MONGO_URL}=process.env ;
const dbConnect=()=>{
    mongoose.connect(MONGO_URL)
      .then(()=>{
          console.log("Successfully connected to database");
      })
      .catch((err)=>{
          console.log(`Error while connecting to database ${err}`);
      })
}

module.exports={
    dbConnect:dbConnect
}