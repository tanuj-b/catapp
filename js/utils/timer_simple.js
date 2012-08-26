// Declaring class "Timer"
var Timer = function()
{        
    // Property: Frequency of elapse event of the timer in millisecond
    this.Interval = 1000;
    
    // Property: Whether the timer is enable or not
    this.Enable = new Boolean(false);
    
    // Event: Timer tick
    this.Tick;
    
    // Property: Hold the count of this timer
    this.count = 0;
    
    // Member variable: Hold interval id of the timer
    var timerId = 0;
    
    // Member variable: Hold instance of this class
    var thisObject;
    
    // Function: start the timer
    this.start = function()
    {
        this.Enable = new Boolean(true);

        thisObject = this;
        var thisCount = thisObject.count;
        if (thisObject.Enable)
        {
            thisObject.timerId = setInterval(
            function()
            {
            	thisCount++;
                thisObject.Tick(); 
            }, thisObject.Interval);
        }
    };
    
    // Function: stops the timer
    this.stop = function()
    {            
        thisObject.Enable = new Boolean(false);
        clearInterval(thisObject.timerId);
    };

};