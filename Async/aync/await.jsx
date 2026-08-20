async function fetchPost() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/2');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Async/Await fetch result:", data);

    } catch (error) {
        console.error("Error in async/await fetch:", error.message);
    }
}

fetchPost();
