<?php
//Objectives Controller
// Create or access a Session
session_start();

$action = filter_input(INPUT_POST, 'action');
    if ($action == NULL){
$action = filter_input(INPUT_GET, 'action');
}
// Get the database connection file
require_once '../library/connections.php';
// Get the objectives model
require_once '../model/objectives-model.php';

switch ($action) {
    case 'getObjectives':
      // Get the array of objectives
      $objectives = getObjectives();
      $objectivesURLs = getObjectivesURLs();
      if(!count($objectives) && !count($objectivesURLs)){
        echo "<p class='red'>Sorry, no objectives or URLs could be found.</p>";
      } else {
         $json = json_encode($objectives + $objectivesURLs);
         echo $json;
      }
      break;
      
    case 'getObjective':
      $objectiveNum = filter_input(INPUT_GET, 'objectiveNum', FILTER_SANITIZE_NUMBER_INT);
      $objective = getObjective($objectiveNum);
      // Get the array of objectives
      if(!$objective){
        echo "<p class='red'>Sorry, no objective could be found.</p>";
      } else {
         $json = json_encode($objective);
        echo $json;
      }
    break;
    
    case 'addObjective':
        // JSON string
        //$incomingJSON = '[{"objectiveNum":"99","objectiveDesc":"this is a test objective","fluencyLevel":"not graded"}]';
        //
        // Handling data in JSON format on the server-side using PHP
        header("Content-Type: application/json");
        
        // build a PHP variable from JSON sent using POST method
        $incomingJSON = stripslashes(file_get_contents("php://input"));
        
        // build a PHP variable from JSON sent using GET method
        //$incomingJSON = stripslashes($_GET["data"]);

        // Convert JSON string to Object
        $jsonObject = json_decode($incomingJSON);
        print_r($jsonObject);      // Dump all data of the Object
        //echo $jsonObject->objectiveNum . "\n"; // Access Object data
        
        foreach($jsonObject as $key => $value) {
        echo $value->objectiveNum . ", " . $value->objectiveDesc . ", " . $value->fluencyLevel .  "\n";
        }
        break;
    default:
      echo "hello world";
}