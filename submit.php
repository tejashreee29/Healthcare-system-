<?php
// Example of form data handling in PHP (assuming form submits POST method)
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $chronic_conditions = $_POST['chronic_conditions'];
    $allergies = $_POST['allergies'];
    $medications = $_POST['medications'];
    $past_surgeries = $_POST['past_surgeries'];
    $family_history = $_POST['family_history'];
    $lifestyle = $_POST['lifestyle'];
    $height = $_POST['height'];
    $weight = $_POST['weight'];
    $blood_type = $_POST['blood_type'];
    $additional_notes = $_POST['additional_notes'];

    // Here, you can store the data in your database or process it
    // For now, we just print the received data
    echo "Medical History Submitted! Here are your details:";
    echo "<pre>";
    print_r($_POST);
    echo "</pre>";
}
?>
