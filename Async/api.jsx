// Example: Fetch multiple resources in parallel
async function fetchMultiplePosts() {
    try {
        const urls = [
            'https://jsonplaceholder.typicode.com/posts/3',
            'https://jsonplaceholder.typicode.com/posts/4'
        ];


        const responses = await Promise.all(urls.map(url => fetch(url)));


        responses.forEach((res, i) => {
            if (!res.ok) {
                throw new Error(`Request ${i + 1} failed with status ${res.status}`);
            }
        });

        // Parse all JSON results
        const data = await Promise.all(responses.map(res => res.json()));
        console.log("Parallel fetch results:", data);

    } catch (error) {
        console.error("Error in parallel fetch:", error.message);
    }
}

fetchMultiplePosts();
