<?php
require_once('../includes/dbconnect.php');

header('Access-Control-Allow-Origin: * ');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Max-Age: 3600');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

$firstName = '';
$lastName = '';
$email = '';
$password = '';
$conn = null;

$conn = db_connect();
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

$data = json_decode(file_get_contents('php://input'));

$firstName = $data->first_name;
$lastName = $data->last_name;
$email = $data->email;
$password = $data->password;
$password_hash = password_hash($password, PASSWORD_BCRYPT);

$table_name = 'users';

$query = 'INSERT INTO ' . $table_name 
  . '(firstName, lastName, email, password) VALUES (?, ?, ?, ?)';
$stmt = $conn->prepare($query);
$stmt->bind_param('ssss', $firstName, $lastName, $email, $password_hash);

if ($stmt->execute()) {
  http_response_code(200);
  echo json_encode(array('message' => 'User was successfully registered.'));
}
else {
  http_response_code(400);
  echo json_encode(array('message' => 'Unable to register the user'));
}
mysqli_close($conn);

?>