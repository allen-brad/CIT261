<?php
function cit261Connect(){
$server = 'localhost';
$dbname= 'bradrall_cit261';
$username = 'bradrall_cit261';
$password = 'V,wah$.ok_7z';
$dsn = "mysql:host=$server;dbname=$dbname";
$options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);

    // Create the actual connection object and assign it to a variable
    try {
        $link = new PDO($dsn, $username, $password, $options);
        return $link;
    } catch(PDOException $e) {
        header('Location: /acme/errordocs/500.php');
        exit;
    }
}
cit261Connect();