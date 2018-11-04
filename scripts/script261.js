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
    var theStatusText = document.createTextNode(status);
    theStatus.appendChild(theStatusText);
    
    // add click to flip note
    var theNote = document.createElement("p");
    theNote.className = "flipnote";
    var newNoteText = document.createTextNode("click to flip");
    theNote.appendChild(newNoteText);
    
    //assemble the front
    theFront.appendChild(theTitle);
    theFront.appendChild(theDescription);
    theFront.appendChild(theStatus);
    theFront.appendChild(theNote);

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

function addCards() {
  //get the objective URLs and put them in local storage for use later
  getObjectiveLinks();
  
  // localhost var objectivesURL = "http://localhost/cit261/objectives/?action=getObjectives&t=" + Math.random(); //random number prevents browser from caching
  var objectivesURL = "http://cit261.bradrallen.com/objectives/?action=getObjectives&t=" + Math.random();

  getJSON(objectivesURL).then(function(objectives){
    //then loop through objectives and create a card for each
    objectives.forEach(function(objective){
      //call the card constructor
      var card = new Card(objective.objectiveID, objective.objectiveNum, objective.objectiveDesc, objective.objectiveUsage, objective.fluencyLevel);
     }); 
  },function(error){
    document.getElementById("carddeck").innerHTML = error;
  });
}
 function flipCard(DivID){
            var card = document.getElementById(DivID);
            card.classList.toggle('flipped');
  }
  function getObjectiveLinks(){
    // testing var url = "http://localhost/cit261/objectives/?action=getObjectivesURLs&t=" + Math.random(); //random number prevents browser from caching
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
  }
  // ------------ utilitie functions ------------ //

  function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}