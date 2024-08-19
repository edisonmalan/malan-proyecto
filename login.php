<?php
include 'db_connect.php';

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->password)) {
    $email = htmlspecialchars(strip_tags($data->email));
    $password = htmlspecialchars(strip_tags($data->password));

    // Buscar el usuario por correo electrónico
    $query = $pdo->prepare("SELECT * FROM users WHERE email = :email");
    $query->bindParam(':email', $email);
    $query->execute();

    $user = $query->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        echo json_encode(['success' => true, 'message' => 'Inicio de sesión exitoso']);
    } else {
        echo json_encode(['success' => false, 'error' => 'Credenciales incorrectas']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Correo y contraseña son obligatorios']);
}
?>
