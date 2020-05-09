<?php

require_once('../includes/dbconnect.php');
require_once('../includes/jwtconfig.php');
require '../vendor/autoload.php';
use \Firebase\JWT\JWT;

header('Access-Control-Allow-Origin: * ');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Max-Age: 3600');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

$key = get_jwt_key();
$jwt = null;

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

try {
  
  if (isset(apache_request_headers()['Authorization'])) {
    $authHeader = apache_request_headers();

    $arr = explode(' ', $authHeader['Authorization']);

    $jwt = $arr[1];
    
  } else {
    http_response_code(401);
  }
  
  if ($jwt) {
    $decoded = JWT::decode($jwt, $key, array('HS256'));
    $decoded_array = (array) $decoded;
    $user_data = $decoded_array['data'];
    $response = (array) $user_data;
    $response['message'] = 'Access Granted!';
    http_response_code(200);
    echo json_encode($response);
    
  }
  
} catch (Exception $e) {
  http_response_code(401);
    
    echo json_encode(array(
      'message' => 'Access Denied.',
      'error' => $e->getMessage()
    )); 
}
?>