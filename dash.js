 let currentUser = null;
        let patients = [];
        let tokenCounter = 1;
        let bills = [];

        // Initialize sample data
        function initializeData() {
            patients = [
                {
                    id: 1,
                    name: "John Doe",
                    phone: "9876543210",
                    department: "General Medicine",
                    diagnosis: "Fever and cold",
                    prescription: "Paracetamol 500mg twice daily",
                    date: "2025-06-10",
                    token: "T001"
                },
                {
                    id: 2,
                    name: "Jane Smith",
                    phone: "9876543211",
                    department: "Cardiology",
                    diagnosis: "Hypertension",
                    prescription: "Amlodipine 5mg once daily",
                    date: "2025-06-10",
                    token: "T002"
                }
            ];
            tokenCounter = 3;
            updateDashboard();
            displayPatients();
        }
         function addPrescription() {
    const patientName = document.getElementById('prescriptionPatientName').value;
    const diagnosis = document.getElementById('diagnosis').value;
    const prescription = document.getElementById('prescription').value;
    const followupDate = document.getElementById('followupDate').value;

    if (!patientName || !diagnosis || !prescription) {
        alert('Please fill all required fields');
        return;
    }

    const newPatient = {
        id: patients.length + 1,
        name: patientName,
        phone: 'N.A', // fallback phone
        department: 'General', // fallback department
        diagnosis: diagnosis,
        prescription: prescription,
        followupDate: followupDate,
        date: new Date().toISOString().split('T')[0],
        doctor: currentUser?.name,
        token: "T" + tokenCounter++
    };

    patients.push(newPatient);
    
    // Clear form
    document.getElementById('prescriptionPatientName').value = '';
    document.getElementById('diagnosis').value = '';
    document.getElementById('prescription').value = '';
    document.getElementById('followupDate').value = '';
    

    showSuccessMessage('Patient added successfully!');
    updateDashboard();
    displayPatients();
}

   function searchPatients() {
            const searchTerm = document.getElementById('patientSearch').value.toLowerCase();
            const filteredPatients = patients.filter(patient => 
                patient.name.toLowerCase().includes(searchTerm) ||
                (patient.phone && patient.phone.includes(searchTerm)) ||
                (patient.token && patient.token.toLowerCase().includes(searchTerm))
            );

            displaySearchResults(filteredPatients);
        }

        function displaySearchResults(searchResults) {
            const resultsHTML = searchResults.map(patient => `
                <div class="patient-card">
                    <h4>${patient.name}</h4>
                    <p><strong>Token:</strong> ${patient.token || 'N/A'}</p>
                    <p><strong>Department:</strong> ${patient.department || 'N/A'}</p>
                    <p><strong>Phone:</strong> ${patient.phone || 'N/A'}</p>
                    <p><strong>Diagnosis:</strong> ${patient.diagnosis || 'N/A'}</p>
                    <p><strong>Prescription:</strong> ${patient.prescription || 'N/A'}</p>
                    <p><strong>Date:</strong> ${patient.date}</p>
                </div>
            `).join('');

            document.getElementById('searchResults').innerHTML = resultsHTML;
        }

        // Display all patients
        function displayPatients() {
            const patientListHTML = patients.map(patient => `
                <div class="patient-card">
                    <h4>${patient.name}</h4>
                    <p><strong>ID:</strong> ${patient.id}</p>
                    <p><strong>Token:</strong> ${patient.token || 'N/A'}</p>
                    <p><strong>Department:</strong> ${patient.department || 'N/A'}</p>
                    <p><strong>Phone:</strong> ${patient.phone || 'N/A'}</p>
                    <p><strong>Diagnosis:</strong> ${patient.diagnosis || 'N/A'}</p>
                    <p><strong>Prescription:</strong> ${patient.prescription || 'N/A'}</p>
                    <p><strong>Date:</strong> ${patient.date}</p>
                    <p><strong>Status:</strong> ${patient.status || 'Completed'}</p>
                </div>
            `).join('');

            document.getElementById('patientList').innerHTML = patientListHTML;
        }

        // Update dashboard
        function updateDashboard() {
            document.getElementById('totalPatients').textContent = patients.length;
            document.getElementById('todayAppointments').textContent = patients.filter(p => p.date === new Date().toISOString().split('T')[0]).length;
            document.getElementById('pendingReports').textContent = patients.filter(p => p.status === 'Waiting').length;
        }

        // Show success message
        function showSuccessMessage(message) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'success-message';
            messageDiv.textContent = message;
            
            const content = document.querySelector('.content');
            content.insertBefore(messageDiv, content.firstChild);
            
            setTimeout(() => {
                messageDiv.remove();
            }, 3000);
        }

        // Initialize the system on page load
        window.onload = function() {
            initializeData();
        };