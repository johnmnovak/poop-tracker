<?php
require_once('../includes/dbconnect.php');
require_once('../includes/jwtconfig.php');
require '../vendor/autoload.php';
use \Firebase\JWT\JWT;

header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Max-Age: 3600');
header('Access-Control-Allow-Headers: content-type, Access-Control-Allow-Headers, Authorization, X-Requested-With, origin');

$email = '';
$password = '';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  http_response_code(200);
  echo json_encode(array('message' => 'Options are gay.'));
  exit;
}


$conn = db_connect();
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

$data = json_decode(file_get_contents('php://input'));

$email = $data->email;
$password = $data->password;

$table_name = 'users';

$query = 'SELECT id, firstName, lastName, password FROM ' . $table_name . ' WHERE email = ? LIMIT 1';
$stmt = $conn->prepare($query);
$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows >= 0) {
  $row = $result->fetch_assoc();
  $id = $row['id'];
  $firstName = $row['firstName'];
  $lastName = $row['lastName'];
  $password2 = $row['password'];
  
  if (password_verify($password, $password2)) {
    $key = get_jwt_key();
    $issuer_claim = "servername";
    $audience_claim = "pooptracker_user";
    $issuedat_claim = time();
    $notbefore_claim = $issuedat_claim;
    $expire_claim = $issuedat_claim + 600;
    $expire_claim_ms = $expire_claim * 1000;
    $token = array(
      'iss' => $issuer_claim,
      'aud' => $audience_claim,
      'iat' => $issuedat_claim,
      'nbf' => $notbefore_claim,
      'exp' => $expire_claim,
      'data' => array(
        'id' => $id,
        'firstname' => $firstName,
        'lastname' => $lastName,
        'email' => $email
      )
    );
    
    http_response_code(200);
    
    $jwt = JWT::encode($token, $key);
    echo json_encode(
      array(
        'message' => 'Successful login.',
        'jwt' => $jwt,
        'email' => $email,
        'expireAt' => $expire_claim_ms,
      )
    );
    
    //header('Location: ../index.html');
    
    
  } else {
    http_response_code(401);
    echo json_encode(array('message' => 'Login failed.', 'password' => $password));
  } 
}
mysqli_close($conn);

?>