<?php
header('Content-Type: application/json');

/* Sécurité : autoriser seulement les requêtes POST */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

/* Récupération et nettoyage des champs */
$nom     = htmlspecialchars(strip_tags(trim($_POST['nom']     ?? '')));
$societe = htmlspecialchars(strip_tags(trim($_POST['societe'] ?? '')));
$email   = filter_var(trim($_POST['email']   ?? ''), FILTER_SANITIZE_EMAIL);
$message = htmlspecialchars(strip_tags(trim($_POST['message'] ?? '')));

/* Validation */
if (!$nom || !$email || !$message || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'error' => 'Champs invalides']);
    exit;
}

/* Destinataire */
$to      = 'contact@egs-trading.fr';
$subject = '=?UTF-8?B?' . base64_encode('Nouveau message EGS Trading — ' . $nom) . '?=';

/* Corps du message */
$body  = "Nouveau message reçu via le site egs-trading.fr\n";
$body .= "----------------------------------------------\n\n";
$body .= "Nom :     $nom\n";
$body .= "Société : $societe\n";
$body .= "Email :   $email\n\n";
$body .= "Message :\n$message\n";

/* En-têtes */
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "From: Site EGS Trading <noreply@egs-trading.fr>\r\n";
$headers .= "Reply-To: $nom <$email>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

/* Envoi */
$sent = mail($to, $subject, $body, $headers);

echo json_encode(['success' => $sent]);
