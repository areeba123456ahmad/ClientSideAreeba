function generateReport() {
    const moduleNamesInput = document.getElementById('moduleNames');
    const moduleNames = moduleNamesInput.value.split(',').map(name => name.trim());
console.log('reached script report ');


    fetch('/generate_report', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ moduleNames }),
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('report').innerHTML = data;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function downloadPDF() {
    const moduleNamesInput = document.getElementById('moduleNames');
    const moduleNames = moduleNamesInput.value.split(',').map(name => name.trim());

    fetch('/generate_report', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ moduleNames }),
    })
    .then(response => response.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'report.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}














