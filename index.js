const express=require('express');
const mongoose=require('mongoose');

// express object
const app=express();


app.use(express.json());

// type of request 



mongoose.connect("mongodb+srv://123:123@cluster0.tewuc.mongodb.net/book?retryWrites=true&w=majority",{useNewUrlParser:true},()=>{
    console.log("mongo server connected");
})

// schema for books collection 
const bookSchema=new mongoose.Schema({
    name:String,
    author:String,
    isbn:Number
})

// model for books collection that will be used for all the operations 
const bookModel= new mongoose.model('books',bookSchema);

// to get all books 
app.get("/books",async (req,res)=>{

    let books=await bookModel.find();
    res.send(books);

})


// to fetch a single book based on id 

app.get("/book/:id",async (req,res)=>{

    let id=req.params.id;
    let book=await bookModel.find({_id:id});
    res.send(book);
})

// to fetch a single book based on author 

app.get("/book/author/:type",async (req,res)=>{

    let type=req.params.type;
    let book=await bookModel.find({author:type});
    res.send(book);
})


// to add a new book
app.post("/book",(req,res)=>{

    let book=req.body;

    let bookObj=new bookModel(book);

    bookObj.save((err,data)=>{
        if(err===null){
            res.send({message:" New Book Added"});
        }
    });
    
  


})


// endpoint to delete a book

app.delete("/book/:id",(req,res)=>{

    let id=req.params.id;

    bookModel.deleteOne({_id:id},(err,data)=>{

        if(err===null){
            res.send({message:"Book Deleted"});
        }

    })

   

})


// to update a Book

app.put("/book/:id",(req,res)=>{

    let id=req.params.id;
    let book=req.body;

    bookModel.updateOne({_id:id},book,(err,data)=>{

        if(err===null)
        {
            res.send("Book Updated");
        }
            
    })

    

})





   
    
    













// creation and start of server 
app.listen(8000,()=>{
    console.log("server is running");
})
