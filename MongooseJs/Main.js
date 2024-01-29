const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/MyDatabase")
.then(()=>{console.log("Connection Succesfull...")})
.catch((err)=> console.log(err));

const playlistSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    ctype : String,
    videos : Number,
    author : String,
    active : Boolean,
    date: {
        type: Date,
        default: Date.now
    }
})

const playlist = new mongoose.model("Playlist",playlistSchema);

const createDocument = async()=>{
    try{
        const reactPlaylist = new playlist({
            name: "React JS",
            ctype:"Front End",
            videos:80,
            author:"Pranav Kumar",
            active : true
        })

        const result = await reactPlaylist.save();
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
}
createDocument();