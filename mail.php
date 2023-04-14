<?php
//this is the email address that the form will send a message to
$to = "adamjs16@gmail.com";
//these are the details that will be sent by the form
$name_field = $_POST['name'];
$email_field = $_POST['email'];
$message = $_POST['message'];

//generate headers for the email
$headers = "From: $name_field <$email_field>\r\n";
$headers .= "Reply-To: $email_field\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();
//test them all against a regex pattern
if (preg_match("/^[A-Za-z .'-]+$/", $name_field) and preg_match("/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/", $email_field) and preg_match("/^(?=(?:\s*\S){20,1000}\s*$).*$/", $message)) {
    //this is the subject line in the email
    $subject = "Message from " . $name_field . " <" . $email_field . ">";
    $body = $message;
    //send the email
    if (mail($to, $subject, $body, $headers)) {
        echo "Thanks for reaching out, I'll be in touch soon!";
    } else {
        echo "There was an error sending your message, please email <a src='mailto:hello@adam-smalley.com'>hello&#64;adam-smalley.com</a>.";
    }
} else {
    die("There was an error sending your message, please email <a src='mailto:hello@adam-smalley.com'>hello&#64;adam-smalley.com</a>.");
}
?>