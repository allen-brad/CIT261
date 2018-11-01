<?php

/* 
 * Objectiges Model
 */

function getObjectives(){
// Create a connection object from the cit261 connection function
    $db = cit261Connect();
// The SQL statement to be used with the database
    $sql = 'SELECT objectives.objectiveID, objectives.objectiveNum, objectives.objectiveDesc , objectiveFluency.fluencyLevel
FROM objectives
	INNER JOIN objectiveFluency on objectives.fluencyID = objectiveFluency.fluencyID
WHERE objectives.fluencyID = objectiveFluency.fluencyID' ;//'SELECT * FROM objectives ORDER BY objectiveNum ASC';
// The next line creates the prepared statement using the connection
    $stmt = $db->prepare($sql);
// The next line runs the prepared statement
    $stmt->execute();
// The next line gets the data from the database and
// stores it as an array in the $categories variable
    $objectives = $stmt->fetchAll();
// The next line closes the interaction with the database
    $stmt->closeCursor();
// The next line sends the array of data back to where the function
// was called (this should be the controller)
    return $objectives;
}

function getObjectivesURLs(){
// Create a connection object from the cit261 connection function
    $db = cit261Connect();
// The SQL statement to be used with the database
    $sql = 'SELECT * FROM objectiveUrls ORDER BY urlID ASC';
    
// The next line creates the prepared statement using the connection
    $stmt = $db->prepare($sql);
// The next line runs the prepared statement
    $stmt->execute();
// The next line gets the data from the database and
// stores it as an array in the $categories variable
    $objectivesURLs = $stmt->fetchAll();
// The next line closes the interaction with the database
    $stmt->closeCursor();
// The next line sends the array of data back to where the function
// was called (this should be the controller)
    return $objectivesURLs;
}

function getObjective($objectiveNum){
    $db = cit261Connect();
    $sql = 'SELECT * FROM objectives WHERE objectiveNum = :objectiveNum';
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':objectiveNum', $objectiveNum, PDO::PARAM_INT);
    $stmt->execute();
    $objective = $stmt->fetch(PDO::FETCH_ASSOC);
    $stmt->closeCursor();
    return $objective;
}

//Insert new objective into objective table database
function addObjective($objectiveNum, $objectiveDesc, $fluencyLevel){
    //create connection object
    $db = cit261Connect();
    //sql statement
    $sql = 'INSERT INTO objectives (objectiveNum, objectiveDesc, fluencyLevel) '
            . 'VALUES (:objectiveNum, :objectiveDesc, :fluencyLevel)';
   //creates prepared statement
    $stmt = $db->prepare($sql);
    // swap out varialbes for actual values
    //tell database the type of data
    $stmt->bindValue(':objectiveNum', $objectiveNum, PDO::PARAM_INT);
    $stmt->bindValue(':objectiveDesc', $objectiveDesc, PDO::PARAM_STR);
    $stmt->bindValue(':fluencyLevel', $fluencyLevel, PDO::PARAM_STR);
    //use the prepared statement to insert data
    $stmt->execute();
    //check to see if it worked
    $rowsChanged = $stmt->rowCount();
    //close connection
    $stmt->closeCursor();
    // Return the indication of success (rows changed)
    return $rowsChanged;
}