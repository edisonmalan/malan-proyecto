<?php
include 'db_connect.php';

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->username) && !empty($data->email) && !empty($data->password) && !empty($data->phone)) {
    $username = htmlspecialchars(strip_tags($data->username));
    $email = htmlspecialchars(strip_tags($data->email));
    $password = htmlspecialchars(strip_tags($data->password));
    $phone = htmlspecialchars(strip_tags($data->phone));

    // Verificar si el correo electrónico ya existe
    $query = $pdo->prepare("SELECT * FROM users WHERE email = :email");
    $query->bindParam(':email', $email);
    $query->execute();

    if ($query->rowCount() > 0) {
        echo json_encode(['success' => false, 'error' => 'El correo electrónico ya está registrado']);
    } else {
        // Insertar el nuevo usuario
        $query = $pdo->prepare("INSERT INTO users (username, email, password, phone) VALUES (:username, :email, :password, :phone)");
        $query->bindParam(':username', $username);
        $query->bindParam(':email', $email);
        $query->bindParam(':password', password_hash($password, PASSWORD_DEFAULT));
        $query->bindParam(':phone', $phone);

        if ($query->execute()) {
            echo json_encode(['success' => true, 'message' => 'Registro exitoso']);
        } else {
            echo json_encode(['success' => false, 'error' => 'Error al registrar el usuario']);
        }
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Todos los campos son obligatorios']);
}
?>
