var myTime, currentTime = new Array(0, 0, 0), timeoutID, hCount = 0, dispMin;

function initStart(){   
	if(timeoutID) return;

 	var startTime = new Date();
 	myTime = new Array(startTime.getHours(), startTime.getMinutes(), startTime.getSeconds());
 	
 	timer();
 	timeoutID = setInterval(timer, 1000);
} 

function initStop(){ 
 	if (timeoutID){
 		clearInterval(timeoutID);
 		timeoutID = 0;
 	}else{
 		return;
 	};
 	
  timer(0, 0); //zero time
  //normalize time:
  currentTime[1] = (currentTime[1]<0)?(60+currentTime[1]):(currentTime[1]);
  dispMin = (currentTime[2]<0)?(currentTime[1]-1):(currentTime[1]);
  currentTime[2] = (currentTime[2]<0)?(60+currentTime[2]):(currentTime[2]);
	alert("Прошло времени: " + hCount + ":" + dispMin + ":" + currentTime[2]);
} 

function init(){
  timer(0, 0); //zero time

  document.getElementById("start").addEventListener("click", initStart, true);
	document.getElementById("stop").addEventListener("click", initStop, true);

}

function currentCountdown(){
	var now = new Date();
  if (currentTime[0] != (now.getHours() - myTime[0])) hCount++;
	currentTime[0] = (myTime != null)?(now.getHours() - myTime[0]):0;
	currentTime[1] = (myTime != null)?(now.getMinutes() - myTime[1]):0;
	currentTime[2] = (myTime != null)?(now.getSeconds() - myTime[2]):0;
	delete now;
}

function timer(min, sec){
	var ctx = document.getElementById('canvas').getContext('2d');
	ctx.save();
	ctx.clearRect(0,0,500,500);
	ctx.translate(125,125);  
  	ctx.scale(0.8,0.8);  
  	ctx.rotate(-Math.PI/2);  

  	ctx.strokeStyle = "black";
  	ctx.lineWidth = 2;
  	ctx.lineCap = "round";

  	ctx.save();
  	for (var i=0;i<12;i++){  
    	ctx.beginPath();  
    	ctx.rotate(Math.PI/6);  
    	ctx.moveTo(110,0);  
    	ctx.lineTo(120,0);  
    	ctx.stroke();  
  	}  
  	ctx.restore();

  	ctx.save();  
  	ctx.lineWidth = 1;  
  	for (i=0;i<60;i++){  
    	if (i%5!=0) {  
      		ctx.beginPath();  
	      	ctx.moveTo(117,0);  
	      	ctx.lineTo(120,0);  
    	  	ctx.stroke();  
   		}  
    ctx.rotate(Math.PI/30);  
  	}  
  	ctx.restore();

  	//time set
  	if(sec == null || min == null){
  		currentCountdown();
  		var sec = currentTime[2];  
  		var min = currentTime[1]; 
  	}

  	ctx.fillStyle = "black";  
  
  	// write minutes  
  	ctx.save();  
  	ctx.rotate((Math.PI/30)*min + (Math.PI/1800)*sec);  
  	ctx.lineWidth = 3;  
  	ctx.beginPath();  
  	ctx.moveTo(0,0);  
  	ctx.lineTo(60,0);  
  	ctx.stroke();  
  	ctx.restore();  
  
  	// write seconds  
  	ctx.save();  
  	ctx.rotate((Math.PI/30)*sec);  
  	ctx.lineWidth = 2;  
  	ctx.beginPath();  
  	ctx.moveTo(0,0);  
  	ctx.lineTo(105,0);  
  	ctx.stroke();  
  	ctx.restore();  

    
  	//Write round base     
  	ctx.beginPath();  
  	ctx.lineWidth = 3; 
  	ctx.strokeStyle = 'black';
  	ctx.arc(0,0,122,0,Math.PI*2,true);  
  	ctx.stroke();   
  	ctx.restore();

  	cssTimer(min, sec);   
}

function cssTimer(min, sec){
	var minuteArrow = document.getElementById("min");
  	var secondArrow = document.getElementById("sec");
  	
  	minuteArrow.style.transform="rotate(" +  (6*min + sec/10) + "deg)";
  	secondArrow.style.transform="rotate(" + 6*sec + "deg)";
}


init();