const Myapi="i9yp7fr2y3";
let train=document.getElementById("number");
let date=document.getElementById("date"); 



function Fetchdata(){

    if(train.value.length==5){
        console.log("clicked")
        let url=`https://api.railwayapi.com/v2/live/train/${train.value}/date/${date.value}/apikey/${Myapi}/`;
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
    document.getElementById("position").innerText=main.current_station.name;
    console.log(main.route.length)
    document.getElementById("trainname").innerText=main.train.name;
    document.getElementById("startdate").innerText=main.start_date;
    console.log(typeof main.start_date);
    document.getElementById("destination").innerText=main.route[main.route.length-1].station.name;
    for (let i = 0; i < main.route.length; i++) {
        if(main.route[i].has_arrived==false && main.route.schdep !="Destination"){
            console.log(main.route[i].station.name);
            document.getElementById("nextstation").innerText=main.route[i].station.name;
            break;
        }
    }
   
}
function reset(){
    train.value="";
    date.value="";
    document.getElementById("result").innerText="";
    document.getElementById("position").innerText="";
    document.getElementById("destination").innerText="";
    document.getElementById("nextstation").innerText="";


}
document.getElementById("submit").addEventListener("click",Fetchdata);
document.getElementById("reset").addEventListener("click",reset);