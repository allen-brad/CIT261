// ------------ objects ------------ //

Card = function Card(objective){
    var newCard = document.createElement("div");
    newCard.className = "card";    

    // create a new div element for the inner shell of the card
    var newCardInside = document.createElement("div");
    //give it a class name and id
    newCardInside.className = "thecard";
    newCardInside.id = objective.objectiveID;
    newCardInside.onclick = function() {flipCard(objective.objectiveID)};

    //create front of card
    var theFront = document.createElement("div");
    //give it a class name and id
    theFront.className = "thefront";
    // give it a title
    var theTitle = document.createElement("h1");
    var newTitleText = document.createTextNode("Objective " + objective.objectiveNum);
    theTitle.appendChild(newTitleText);
    // give it a description
    var theDescription = document.createElement("p");
    var newDescriptionText = document.createTextNode(objective.objectiveDesc);
    theDescription.appendChild(newDescriptionText);
    
    // add status
    var theStatus = document.createElement("h3");
    theStatus.className = "objectivestatus";
    var theStatusText = document.createTextNode(objective.fluencyLevel);
    theStatus.appendChild(theStatusText);
    
    // add click to flip note
    var theNote = document.createElement("p");
    theNote.className = "thecard";
    var newNoteText = document.createTextNode("click to flip");
    theNote.appendChild(newNoteText);
    
    //assemble the front
    theFront.appendChild(theTitle);
    theFront.appendChild(theDescription);
    theFront.appendChild(theStatus);
    theFront.appendChild(theNote);

    //create back of card
    var theBack = document.createElement("div");
    //give it a class name and id
    theBack.className = "theback";
    // give it a title
    var theTitle = document.createElement("h2");
    var newTitleText = document.createTextNode("Objective " + objective.objectiveNum + "<br>Example Links");
    theTitle.appendChild(newTitleText);
    // dummy link for now... add links using a for loop in future 
    var theLink = document.createElement("a");
    var theLinkText = document.createTextNode("Create HTML Elements on the fly...");
    theLink.setAttribute('href', "http://localhost/cit261/sandbox.html?objective=01&page=loops");
    // live theLink.setAttribute('href', "http://cit261.bradrallen.com/sandbox.html?objective=01&page=loops");
    theLink.appendChild(theLinkText);

    //assemble the back
    theBack.appendChild(theTitle);
    theBack.appendChild(theLink);

    //add front and back to the card and the card to the card container
    newCardInside.appendChild(theFront);
    newCardInside.appendChild(theBack);
    newCard.appendChild(newCardInside);
    return newCard;
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
  console.log('calling for objectives');

  var objectivesURL = "http://localhost/cit261/objectives/?action=getObjectives&t=" + Math.random();
  // live var objectivesURL = "http://cit261.bradrallen.com/objectives/?action=getObjectives&t=" + Math.random();

  getJSON(objectivesURL).then(function(objectives){
    //then loop through objectives and create a card for each
    objectives.forEach(function(objective){
      //call the card constructor
      card = new Card(objective);
      // add the newly created card to the container and into the DOM 
    var cardDeck = document.getElementById("carddeck"); 
    cardDeck.appendChild(card);
    }); 
  },function(error){
    document.getElementById("carddeck").innerHTML = error;
  });
}
 function flipCard(DivID){
            var card = document.getElementById(DivID);
            card.classList.toggle('flipped');
            var note = document
  }

