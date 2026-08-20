fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse JSON
    })
    .then(data => {
        console.log("Promise-based fetch result:", data);
    })
    .catch(error => {
        console.error("Error in Promise-based fetch:", error.message);
    });
