document.getElementById('input-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
        vertices: formData.get('vertices'),
        edges: formData.get('edges'),
        'edge-details': formData.get('edge-details'),
        start: formData.get('start')
    };

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(data)
    })
    .then(response => response.text())
    .then(result => {
        document.getElementById('output').innerHTML = result;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
