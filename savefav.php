<?php
// core configuration
include_once "config/core.php";
 
// set page title
$page_title = "Save Favlist";

include_once 'config/database.php';
include_once 'objects/user.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

$user = new User($db);

if(isset($_REQUEST))
{
        
    $thisID=$_POST['favlist'];
$sql="INSERT INTO users (favlist) VALUES ('$thisID')";
$result=mysql_query($sql);
if($result){
echo "You have been successfully subscribed.";
}
}
?>
<?php
var_dump($_POST);