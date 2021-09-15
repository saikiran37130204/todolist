//console.log(module);

//sample before decreasing the code
//inside the this file we can export with out the module by using only exports word

//module.exports.getDate=getDate;

/*
function getDate(){
  const today=new Date();
  const options={
    weekday:"long",
    day:"numeric",
    month:"long"
  };

  const day=today.toLocaleDateString("en-US",options);
  return day;
}*/

exports.getDate = function(){
  const today=new Date();
  const options={
    weekday:"long",
    day:"numeric",
    month:"long"
  };

  const day=today.toLocaleDateString("en-US",options);
  return day;
}

exports.getDay=function(){
  const today=new Date();
  const options={
    weekday:"long"
  };

  const day=today.toLocaleDateString("en-US",options);
  return day;
}
//console.log(module.exports);