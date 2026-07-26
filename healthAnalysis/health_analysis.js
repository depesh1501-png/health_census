// Fetch and display health conditions data
document.addEventListener('DOMContentLoaded', function() {
    const conditionSelect = document.getElementById('conditionSelect');
    const healthInfoContainer = document.getElementById('healthInfoContainer');
    let healthData = [];

    // Fetch the JSON data using full GitHub raw URL
    fetch('https://raw.githubusercontent.com/depesh1501-png/health_census/main/healthAnalysis/health_analysis.json')
        .then(response => response.json())
        .then(data => {
            healthData = data.conditions;
            console.log('Health data loaded:', healthData);
        })
        .catch(error => {
            console.error('Error loading health data:', error);
            healthInfoContainer.innerHTML = '<p style="color: red;">Error loading health data</p>';
        });

    // Event listener for condition selection
    conditionSelect.addEventListener('change', function() {
        const selectedCondition = this.value;
        
        if (selectedCondition === '') {
            healthInfoContainer.innerHTML = '';
            return;
        }

        // Find the selected condition in the data
        const condition = healthData.find(c => c.name === selectedCondition);
        
        if (condition) {
            displayHealthInfo(condition);
        }
    });

    // Function to display health information
    function displayHealthInfo(condition) {
        let symptomsHTML = condition.symptoms.map(symptom => `<li>${symptom}</li>`).join('');
        let preventionHTML = condition.prevention.map(prev => `<li>${prev}</li>`).join('');

        const healthHTML = `
            <div class="health-info active">
                <div class="health-card">
                    <div class="health-image">
                        <img src="https://raw.githubusercontent.com/depesh1501-png/health_census/main/healthAnalysis/${condition.imagesrc}" alt="${condition.name}">
                    </div>
                    <div class="health-details">
                        <h2>${condition.name}</h2>
                        
                        <div class="section">
                            <h3>Symptoms</h3>
                            <ul>
                                ${symptomsHTML}
                            </ul>
                        </div>
                        
                        <div class="section">
                            <h3>Prevention</h3>
                            <ul>
                                ${preventionHTML}
                            </ul>
                        </div>
                        
                        <div class="section">
                            <h3>Treatment</h3>
                            <p>${condition.treatment}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        healthInfoContainer.innerHTML = healthHTML;
    }
});
