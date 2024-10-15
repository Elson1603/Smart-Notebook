document.getElementById('scanBtn').addEventListener('click', function() {
    const fileInput = document.getElementById('upload');
    const result = document.getElementById('result');

    if (fileInput.files.length === 0) {
        result.textContent = "Please upload or select a file to scan.";
        return;
    }

    // Read the uploaded image file
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function() {
        console.log("File loaded successfully, starting OCR...");
        
        // Use Tesseract.js to extract text from the image
        Tesseract.recognize(
            reader.result,
            'eng', // Specify the language of the text
            {
                logger: (m) => console.log(m) // Log progress to the console
            }
        ).then(({ data: { text } }) => {
            console.log("OCR completed successfully.");
            result.textContent = text; // Display the extracted text
        }).catch((error) => {
            result.textContent = "An error occurred while scanning the image.";
            console.error("Tesseract.js error:", error);
        });
    };

    reader.onerror = function() {
        console.error("File reading error:", reader.error);
        result.textContent = "Failed to read file.";
    };

    reader.readAsDataURL(file); // Convert the image file to a data URL
});

// Optional: Trigger file input when clicking on the 'Scan Page' button
document.getElementById('upload').addEventListener('change', function() {
    const result = document.getElementById('result');
    result.textContent = "File uploaded. Ready to scan.";
    console.log("File selected:", this.files[0]);
});
