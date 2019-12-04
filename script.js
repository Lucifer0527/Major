const Myapi="vrhe8k2i6r";
let train=document.getElementById("number");
let date=document.getElementById("date"); 
let stationCode=document.getElementById("code"); 
console.log(stationCode)

let Year="";
let day="";
let month="";


function Fetchdata(){
    let dateArray=date.value.split("");
    for (let i = 0; i < 4; i++) {
         Year=Year+dateArray[i];  
    }
    for (let i = 5; i < 7; i++) {
        month=month+dateArray[i];
    }
    for (let i = 8; i <10; i++) {
        day=day+dateArray[i];
    }
     let OringnalDate=day+"-"+month+"-"+Year;
     console.log(OringnalDate);
    if(train.value.length==5){
        document.getElementById("error").innerHTML="";
        let url=`https://api.railwayapi.com/v2/live/train/${train.value}/station/${stationCode.value}/date/${OringnalDate}/apikey/${Myapi}/`;
        let request= new XMLHttpRequest();
        request.open('GET',url);
        request.onreadystatechange=function(){
            if(this.readyState==4 && this.status==200){
                let main=JSON.parse(this.responseText);
                console.log(main)
                printdata(main);
            }
            else{
                console.log(this.status);
            }
        }
        request.send();
    }
    else{
        document.getElementById("error").innerHTML="Please Enter Valid Train Number";
    }

}

function printdata(main){
    document.getElementById("result").innerText=main.position;
    // document.getElementById("position").innerText=main.current_station.name;
    // console.log(main.route.length)
    document.getElementById("trainname").innerText=main.train.name;
    document.getElementById("startdate").innerText=main.start_date;
    // console.log(typeof main.start_date);
    document.getElementById("sd").innerText=main.status.schdep;
    document.getElementById("sa").innerText=main.status.actarr;

    Year="";
    day="";
    month="";
   
}
function reset(){
    train.value="";
    date.value="";
    document.getElementById("result").innerText="";
    document.getElementById("position").innerText="";
    document.getElementById("destination").innerText="";
    document.getElementById("nextstation").innerText="";
    document.getElementById("trainname").innerText="";
    document.getElementById("startdate").innerText="";
    let Year="";
let day="";
let month="";

}
document.getElementById("submit").addEventListener("click",Fetchdata);
document.getElementById("reset").addEventListener("click",reset);