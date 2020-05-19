const express=require('express');
const bodyParser=require('body-parser');

const app=express();
let items=[];
let workItems=[];
let otherItems=[];
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');
app.use(express.static("public"));


app.get("/",function(req,res){
    let today=new Date();
    let currentDay=today.getDay();
    
    let options={
        weekday:"long",
        day:"numeric",
        month:"long"
    };

    let day=today.toLocaleDateString("en-IN",options);
    res.render("list",{ListTitle:day,newListItem:items});


})
app.get("/work",function(req,res){
  
    res.render("list",{ListTitle:"Work List",newListItem:workItems});
});
app.get("/others",function(req,res)
{
    res.render("list",{ListTitle:"Other Todos",newListItem:otherItems});
})

app.post("/",function(req,res){
let item=req.body.newItem;
console.log(req.body)
if(req.body.list==="Work"){
    workItems.push(item);
    res.redirect("/work");

}
else if(req.body.list==="Other")
{
    otherItems.push(item);
    res.redirect("/other");
}
else
{
    items.push(item);
    res.redirect("/");
}

});






app.listen(process.env.PORT||3000,function(){
    console.log("Server started on server on port 3000");
})