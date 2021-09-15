const express=require("express");
const mongoose=require("mongoose");
//const date=require(__dirname+"/date.js");
const _=require("lodash");


const app=express();
//console.log(date());
app.set("view engine","ejs");

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

//let texts=["buy food","cook food","eat food"];
//let workItems=[];


//mongoose.connect("mongodb://localhost:27017/todolistDB");
mongoose.connect("mongodb+srv://admin-saikiran:Sai@37130@cluster0.zgm7v.mongodb.net/todolistDB",{useNewUrlParser:true});
// /myFirstDatabase?retryWrites=true&w=majority
const itemsSchema=new mongoose.Schema(
{
  name:String
}
);

const Item=mongoose.model("Item",itemsSchema);

const item1=new Item({
name:"Welcome to your todolist!"
})

const item2=new Item({
  name:"Hit the + button to aff a new item."
  })
  
  const item3=new Item({
    name:"<-- Hit this to delete an item."
    });
      
    const defaultItems=[item1,item2,item3];

   const listSchema={
     name:String,
     items:[itemsSchema]
   };

   const List=mongoose.model("List",listSchema);

app.get("/",function(req,res){
  
 
  //let day=date.getDay();

  Item.find({},function(err,foundItems){
if(foundItems.length===0){
 Item.insertMany(defaultItems,function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log("successfully inserted");
      }
    });
    res.redirect("/");
}
else{
    res.render("list",{listTitle:"Today",newListItems:foundItems});
}
  });

  
});


app.get("/:customListName",function(req,res){
 const customListName=_.capitalize(req.params.customListName);
//const customListName=req.params.customListName;
  List.findOne({name:customListName},function(err,foundList){
    if(!err){
      if(!foundList){
       // console.log("doesn't exist!");
       const list=new List(
        {
          name:customListName,
          items:defaultItems
        }
      );
    
      list.save();

      res.redirect("/"+customListName);
      }
      else{
       // console.log("exists!");
       res.render("list",{listTitle:foundList.name,newListItems:foundList.items});
      }
    }
  })

  
});


app.post("/",function(req,res){
  let itemName=req.body.newItem;
  const listName=req.body.list;
const item=new Item({
  name:itemName
});
 
if(listName==="Today"){
  item.save();
  res.redirect("/");
}
else{
  List.findOne({name:listName},function(err,foundList){
foundList.items.push(item)
foundList.save();
res.redirect("/"+listName)
  });
  
}

  /*
  if(req.body.list==="work"){
workItems.push(item);
res.redirect("/work");
  }else{
    texts.push(item);
    res.redirect("/");
  }*/
  //res.write("<h1>the new item is "+text+"</h1>");
});

app.post("/delete",function(req,res){
  const checkedItemId=req.body.checkbox;
//console.log(checkedItemId)
const listName=req.body.listName;

if(listName==="Today"){
  Item.findByIdAndRemove(checkedItemId,function(err){
    if(!err){
      console.log("Successfully deleted checked item.");
      res.redirect("/");
    }
  });
}else{
  List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkedItemId}}}, function(err,foundList){
    if(!err){
      res.redirect("/"+listName);
    }

  });
}
  
})



/*
app.get("/work",function(req,res){
  res.render("list",{listTitle:"work list",newListItems:defaultItems})
})
app.post("/work",function(req,res){
  //console.log(req.body);
  let item=req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})
*/
app.get("/about",function(req,res){
  res.render("about");
})
app.listen(3000,function(){
  console.log("server started on port 3000");
})

// in get / route

// let currentDay=today.getDay();
 //var day="";
  /*
  if(currentDay===6 || currentDay===0){
    day="weekend";
    
  }else{
    day="weekday";
  }
  switch(currentDay){
   case 0:
     day="sunday";
     break;
   case 1:
       day="monday";
       break;
    case 2:
         day="tuesday";
         break;
    case 3:
           day="wednesday";
           break;
    case 4:
             day="thursday";
             break;
    case 5:
               day="friday";
               break;
     case 6:
                 day="saturday"
                 break;
       default: 
                 console.log("error: current day is equal to: "+currentDay);
  }*/