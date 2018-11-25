// ------------ objects ------------ //

  function Card(id, number, desc, usage, status){
    // create a new dive for the outter container
    var newCard = document.createElement("div");
    newCard.className = "card";    

    // create a new div element for the inner shell of the card
    var newCardInside = document.createElement("div");
    //give it a class name and id
    newCardInside.className = "thecard";
    newCardInside.id = id;
    newCardInside.onclick = function() {flipCard(id)};

    //create front of card
    var theFront = document.createElement("div");
    //give it a class name
    theFront.className = "thefront";
    // give it a title
    var theTitle = document.createElement("h1");
    var newTitleText = document.createTextNode("Objective " + number);
    theTitle.appendChild(newTitleText);
    // give it a description
    var theDescription = document.createElement("p");
    var newDescriptionText = document.createTextNode(desc);
    theDescription.appendChild(newDescriptionText);
    
    // add status
    var theStatus = document.createElement("h3");
    theStatus.className = "objectivestatus";
    //if status is submitted then stick each character in a <span> and append that to the h3
    if (status ==="submitted for grading"){
        var i;
        for (i = 0; i < status.length; i++) {
          var aSpan = document.createElement("span");
          var t = document.createTextNode(status.charAt(i));
          aSpan.appendChild(t);
          theStatus.appendChild(aSpan);
        }        
        theStatus.classList.add("gradePending");
    }else
    {
        //if status is skilled then make text bigger
      if (status ==="skilled"){
        theStatus.classList.add("skilled");
      }     
      var theStatusText = document.createTextNode(status);
      theStatus.appendChild(theStatusText);
    }

    
    //assemble the front
    theFront.appendChild(theTitle);
    theFront.appendChild(theDescription);
    theFront.appendChild(theStatus);
    //theFront.appendChild(theNote);

    //create back of card
    var theBack = document.createElement("div");
    theBack.className = "theback";
    
    // give it a title
    var theTitle = document.createElement("h2");
    var newTitleText = document.createTextNode("Objective " + number);
    theTitle.appendChild(newTitleText);
    //add a break to the h2
    theTitle.appendChild(document.createElement("br"));
    //add line after break
    var newTitleText2 = document.createTextNode("Usage & Examples");
    theTitle.appendChild(newTitleText2);

     // add usage paragraph
    var theUsage = document.createElement("p");
    theUsage.className = "usage";
    if (usage == null){
      var newUsageText = document.createTextNode("not ready for grading");
    }else{
      var newUsageText = document.createTextNode(usage);
    }
    theUsage.appendChild(newUsageText);
    

    //assemble the back
    theBack.appendChild(theTitle);
    theBack.appendChild(theUsage);
    //check local storage for a link and add if present
    var objectiveLink = JSON.parse(window.localStorage.getItem(id));
    if(isEmpty(objectiveLink)) {
      // means no link so don't add one
    } else { //there is a link so add it
      var theLink = document.createElement("a");
      var theLinkText = document.createTextNode(objectiveLink.urlDescription);
      theLink.setAttribute('href', objectiveLink.url);
      theLink.setAttribute('target', '_blank');
      theLink.appendChild(theLinkText);
      theBack.appendChild(theLink);
    }

    //add front and back to the card and the card to the card container
    newCardInside.appendChild(theFront);
    newCardInside.appendChild(theBack);
    newCard.appendChild(newCardInside);
    
    // add the newly created card to the card deck and into the DOM 
    var cardDeck = document.getElementById("carddeck"); 
    cardDeck.appendChild(newCard);
};

// ------------ functions ------------ //

//generic XHR function with promise built in
function get(url) {
  // return a new promise.
  return new Promise(function(resolve, reject) {
    // do the XHR stuff
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function() {
      // check the status
      if (req.status == 200) {
        // resolve the promise with the response text
        resolve(req.response);
      }
      else {
        // not OK so reject with the status text
        reject(Error(req.statusText));
      }
    };
    // deal with network errors
    req.onerror = function() {
      reject(Error("Network Error!"));
    };
    // send the request
    req.send();
  });
}

//uses the generic get function when JSON is expected result
function getJSON(url) {
  return get(url).then(JSON.parse).catch(function(err){
    console.log("getJSON failed for", url, err);
    throw err;
  });
}

function getObjectiveLinks(){
    return new Promise(function(resolve) {
        //local var url = "http://localhost/cit261/objectives/?action=getObjectivesURLs&t=" + Math.random(); //random number prevents browser from caching
        var url = "http://cit261.bradrallen.com/objectives/?action=getObjectivesURLs&t=" + Math.random();

                  getJSON(url).then(function(objectivesURLs){
                    //store the result in local storage
                    objectivesURLs.forEach(function(url){
                      //take each url and store it in local storage objectiveID,
                      window.localStorage.setItem(url.objectiveID, JSON.stringify(url));
                     }); 
                  },function(error){
                    console.log(error);
                  });
        resolve("done!");
    });
}

function addCards() {
  //local var objectivesURL = "http://localhost/cit261/objectives/?action=getObjectives&t=" + Math.random(); //random number prevents browser from caching
  var objectivesURL = "http://cit261.bradrallen.com/objectives/?action=getObjectives&t=" + Math.random();

  getJSON(objectivesURL).then(function(objectives){
    //then loop through objectives and create a card for each
    objectives.forEach(function(objective){
      //call the card constructor
      var card = new Card(objective.objectiveID, objective.objectiveNum, objective.objectiveDesc, objective.objectiveUsage, objective.fluencyLevel);
     });
   console.log("addCards worked");
  },function(error){
    console.log("addCards broke");
    document.getElementById("carddeck").innerHTML = error;
  });
}

function buildTheDeck(){
  //get the objective URLs and put them in local storage using a promise so we don't start building the cards untile we're ready.
  getObjectiveLinks().then(function(result) {
    //it worked so now add the cards
    console.log("getObjectiveLinks worked");
    addCards();
  }, function(err) {
    console.log("getObjectiveLinks broke");
    document.getElementById("carddeck").innerHTML = err;
  });
}

function flipCard(DivID){
            var card = document.getElementById(DivID);
            //card.classList.toggle('flipped');
            card.classList.toggle('hover');
}
  
 
// define the constellations to plot
var ursaMajor=[];
ursaMajor.push({x:299,y:117,size:3,name:"Alkaid"});
ursaMajor.push({x:295,y:174,size:2,name:"Mizar"});
ursaMajor.push({x:275,y:201,size:2,name:"Alioth"});
ursaMajor.push({x:252,y:236,size:1,name:"Megrez"});
ursaMajor.push({x:216,y:238,size:3,name:"Phad"});
ursaMajor.push({x:203,y:299,size:2,name:"Merak"});
ursaMajor.push({x:242,y:316,size:4,name:"Dubhe"});
ursaMajor.push({x:252,y:236,size:1,name:"Megrez"});//repeated for constellation 


var ursaMinor=[];
ursaMinor.push({x:447,y:418,size:4,name:"Polaris"});
ursaMinor.push({x:419,y:286,size:4,name:"Kocab"});
ursaMinor.push({x:435,y:265,size:3,name:"Pherkad"});
ursaMinor.push({x:466,y:351,size:2,name:"Epsilon Ursae Minoris"});
ursaMinor.push({x:449,y:312,size:2,name:"Akhfa al Farkadain"});
ursaMinor.push({x:461,y:388,size:3,name:"Yildun"});
ursaMinor.push({x:466,y:297,size:1,name:"Anwar al Farkadain"});

function drawStar(constellation){
  var canvas = document.getElementById("starChart");
  var ctx = canvas.getContext("2d");
    constellation.forEach(function(star){
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, 2*Math.PI);
      ctx.fillStyle = 'white';
      ctx.fill();
    });
}

function buildStarChart(){
  drawStar(ursaMajor);
  drawStar(ursaMinor);
  // start the animation
  animate();
}

//animate constellations

// calc waypoints traveling along vertices
function calcWaypoints(vertices){
    var waypoints=[];
    for(var i=1;i<vertices.length;i++){
        var pt0=vertices[i-1];
        var pt1=vertices[i];
        var dx=pt1.x-pt0.x;
        var dy=pt1.y-pt0.y;
        for(var j=0;j<100;j++){
            var x=pt0.x+dx*j/100;
            var y=pt0.y+dy*j/100;
            waypoints.push({x:x,y:y});
        }
    }
    return(waypoints);
}

// calculate incremental points along the path
var points=calcWaypoints(ursaMajor);

// variable to hold how many frames have elapsed in the animation
// t represents each waypoint along the path and is incremented in the animation loop
var t=1;



// incrementally draw additional line segments along the path
function animate(){
    var canvas = document.getElementById("starChart");
    var ctx = canvas.getContext("2d");


    if(t<points.length-1){ requestAnimationFrame(animate); }
    // draw a line segment from the last waypoint
    // to the current waypoint
    ctx.beginPath();
    ctx.moveTo(points[t-1].x,points[t-1].y);
    ctx.lineTo(points[t].x,points[t].y);
    ctx.strokeStyle = '#e6e6e6';
    ctx.stroke();
    // increment "t" to get the next waypoint
    t++;
}

var myVideo = document.getElementById("flareVideo"); 

function playPause() { 
    if (myVideo.paused) 
        myVideo.play(); 
    else 
        myVideo.pause(); 
} 

function makeBig() { 
    myVideo.width = 560; 
} 

function makeSmall() { 
    myVideo.width = 320; 
} 

function makeNormal() { 
    myVideo.width = 420; 
} 


  // ------------ utilitie functions ------------ //

  function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}