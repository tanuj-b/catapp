var mins,secs,TimerRunning,TimerID;
 TimerRunning=false;
 
 function Init() //call the Init function when u need to start the timer
 {
    mins=15;
    secs=0;
    StopTimer();
    StartTimer();
 }
 
 function StopTimer()
 {
    if(TimerRunning)
       clearTimeout(TimerID);
    TimerRunning=false;
 }
 
 function StartTimer()
 {
    TimerRunning=true;
    window.status="Time Remaining "+Pad(mins)+":"+Pad(secs);
    TimerID=self.setTimeout("StartTimer()",1000);
 
    Check();
    
    if(mins==0 && secs==0)
       StopTimer();
    
    if(secs==0)
    {
       mins--;
       secs=60;
    }
    secs--;
 
 }
 
 function Check()
 {
    if(mins==5 && secs==0)
       alert("You have only five minutes remaining");
    else if(mins==0 && secs==0)
    {
       alert("Your alloted time is over.");
    }
 }
 
 function Pad(number) //pads the mins/secs with a 0 if its less than 10
 {
    if(number<10)
       number=0+""+number;
    return number;
 }