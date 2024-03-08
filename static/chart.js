document.addEventListener('DOMContentLoaded', () => {
    const dataForm = document.getElementById('dataForm');
    const chartContainer = document.getElementById('chartContainer');

    dataForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(dataForm);
        const data = formData.get('data').split(',').map(Number);
        const chartType = formData.get('chartType');
        
        try {
            const response = await axios.post('/chart', { data, chart_type: chartType });
            renderChart(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    });

    function renderChart(data) {
        chartContainer.innerHTML = '';
        const canvas = document.createElement('canvas');
        chartContainer.appendChild(canvas);
        
        new Chart(canvas, {
            type: data.chart_type,
            data: {
                labels: Array.from(Array(data.data.length).keys()),
                datasets: [{
                    label: 'Data',
                    data: data.data,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
});
