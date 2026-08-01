<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configurable Admin Password (Default: magna2026)
$ADMIN_PASSWORD = 'magna2026';
$SECRET_SALT = 'magna_promotion_secret_salt_2026';

function generate_token($password, $salt) {
    return hash('sha256', $password . $salt);
}

$EXPECTED_TOKEN = generate_token($ADMIN_PASSWORD, $SECRET_SALT);

$input = json_decode(file_get_contents('php://input'), true);
$action = isset($_GET['action']) ? $_GET['action'] : (isset($input['action']) ? $input['action'] : '');

// Handle Login
if ($action === 'login') {
    $password = isset($input['password']) ? $input['password'] : '';
    if ($password === $ADMIN_PASSWORD) {
        echo json_encode([
            'success' => true,
            'token' => $EXPECTED_TOKEN,
            'message' => 'Authenticated successfully'
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Invalid password']);
    }
    exit();
}

// Authenticate Token for all write actions
$headers = getallheaders();
$auth_header = isset($headers['Authorization']) ? $headers['Authorization'] : (isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : '');
$provided_token = str_replace('Bearer ', '', $auth_header);

if ($provided_token !== $EXPECTED_TOKEN) {
    http_response_code(403);
    echo json_encode(['success' => false, 'error' => 'Unauthorized']);
    exit();
}

// Handle Save Content
if ($action === 'save_content') {
    $file_key = isset($input['file']) ? preg_replace('/[^a-z0-9_-]/i', '', $input['file']) : '';
    $content = isset($input['content']) ? $input['content'] : null;

    if (empty($file_key) || $content === null) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Missing file or content']);
        exit();
    }

    $target_dir = __DIR__ . '/../content/';
    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0755, true);
    }

    $target_file = $target_dir . $file_key . '.json';
    $json_data = is_string($content) ? $content : json_encode($content, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

    if (file_put_contents($target_file, $json_data) !== false) {
        echo json_encode(['success' => true, 'message' => "Saved $file_key.json successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to write file']);
    }
    exit();
}

// Handle Image Upload
if ($action === 'upload_image') {
    if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'No valid file uploaded']);
        exit();
    }

    $uploads_dir = __DIR__ . '/../uploads/';
    if (!file_exists($uploads_dir)) {
        mkdir($uploads_dir, 0755, true);
    }

    $file_info = pathinfo($_FILES['file']['name']);
    $extension = isset($file_info['extension']) ? strtolower($file_info['extension']) : 'jpg';
    $allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];

    if (!in_array($extension, $allowed_extensions)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid image format']);
        exit();
    }

    $filename = preg_replace('/[^a-z0-9_-]/i', '_', $file_info['filename']) . '_' . time() . '.' . $extension;
    $target_path = $uploads_dir . $filename;

    if (move_uploaded_file($_FILES['file']['tmp_name'], $target_path)) {
        echo json_encode([
            'success' => true,
            'url' => '/uploads/' . $filename,
            'message' => 'Image uploaded successfully'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to save uploaded image']);
    }
    exit();
}

http_response_code(400);
echo json_encode(['success' => false, 'error' => 'Invalid action']);
?>
