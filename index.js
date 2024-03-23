const express=require("express");
const app=express();
const path=require("path");
const port=3000;
const {v4:uuidv4}=require('uuid');
const methodOverride=require("method-override");
uuidv4();
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.get("/",(req,res)=>{
    res.send("this is good");
});
let posts=[
    {
        id:uuidv4(),
        username:"shradda",
        content:"i love coding",
    },
    {
        id:uuidv4(),
        username:"ram",
        content:"good work",
    },
    {
        id:uuidv4(),
        username:"ankur",
        content:"Got job at atlassian",
    },
];
app.get("/post",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/post/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/post",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({username,content,id});
    res.redirect("/post");
});
app.get("/post/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id==p.id);
    res.render("show.ejs",{post});
});
app.patch("/post/:id",(req,res)=>{
    let {id}=req.params;
    let ncontent=req.body.content;
    let post=posts.find((p)=>id==p.id);
    post.content=ncontent;
    console.log(post);
    res.redirect("/post");
});
app.get("/post/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id==p.id);
    res.render("edit.ejs",{post});
});
app.delete("/post/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!=p.id);
    res.redirect("/post");
})
app.listen(port,()=>{
    console.log("listen");
});
