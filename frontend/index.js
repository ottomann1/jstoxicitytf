document.getElementById('sendButton').addEventListener('click', async () => {
    const textInput = document.getElementById('textInput').value;
    const resultsDiv = document.getElementById('results');

    // Clear previous results
    resultsDiv.innerHTML = 'Loading...';

    try {
        const response = await fetch('http://localhost:3000/classify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: textInput })
        });

        const predictions = await response.json();

        // Display the results
        resultsDiv.innerHTML = '';
        predictions.forEach(prediction => {
            const result = document.createElement('p');
            result.textContent = `${prediction.label}: ${prediction.results[0].match ? 'Toxic' : 'Not Toxic'}`;
            resultsDiv.appendChild(result);
        });
    } catch (error) {
        resultsDiv.innerHTML = 'Error occurred while classifying the text';
    }
});
