export const createRequest = async(url, data, method = 'POST') => {
    return await fetch('api/' + url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data ? data : {})
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error("Error:", error));
}