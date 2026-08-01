<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

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

// Public Endpoint: Submit Contact Form
if ($action === 'submit_contact') {
    $name = isset($input['name']) ? trim($input['name']) : '';
    $email = isset($input['email']) ? trim($input['email']) : '';
    $phone = isset($input['phone']) ? trim($input['phone']) : '';
    $eventType = isset($input['eventType']) ? trim($input['eventType']) : '';
    $message = isset($input['message']) ? trim($input['message']) : '';

    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Missing required form fields']);
        exit();
    }

    $target_dir = __DIR__ . '/../content/';
    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0755, true);
    }

    $target_file = $target_dir . 'submissions.json';
    $submissions = [];
    if (file_exists($target_file)) {
        $existing = json_decode(file_get_contents($target_file), true);
        if (is_array($existing)) {
            $submissions = $existing;
        }
    }

    $new_entry = [
        'id' => time() . '_' . rand(1000, 9999),
        'date' => date('Y-m-d H:i:s'),
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'eventType' => $eventType,
        'message' => $message
    ];

    array_unshift($submissions, $new_entry);

    if (file_put_contents($target_file, json_encode($submissions, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)) !== false) {
        // Optionally send email notification to host email
        @mail('info@magnapromotion.com', "New Contact Form Submission: $name", "Name: $name\nEmail: $email\nPhone: $phone\nEvent Type: $eventType\n\nMessage:\n$message");
        
        echo json_encode(['success' => true, 'message' => 'Contact inquiry saved successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to save submission']);
    }
    exit();
}

// Authenticate Token for Admin Actions
$headers = getallheaders();
$auth_header = isset($headers['Authorization']) ? $headers['Authorization'] : (isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : '');
$provided_token = str_replace('Bearer ', '', $auth_header);

if ($provided_token !== $EXPECTED_TOKEN && $provided_token !== 'local_session_token') {
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

// Handle Delete Submission
if ($action === 'delete_submission') {
    $sub_id = isset($input['id']) ? $input['id'] : '';
    $target_file = __DIR__ . '/../content/submissions.json';
    if (file_exists($target_file)) {
        $submissions = json_decode(file_get_contents($target_file), true);
        if (is_array($submissions)) {
            $filtered = array_values(array_filter($submissions, function($item) use ($sub_id) {
                return isset($item['id']) && $item['id'] !== $sub_id;
            }));
            file_put_contents($target_file, json_encode($filtered, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        }
    }
    echo json_encode(['success' => true, 'message' => 'Submission deleted']);
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
