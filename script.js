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

        // Navigation
        function showSection(sectionId) {
            // Hide all sections
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Remove active class from all tabs
            document.querySelectorAll('.nav-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Show selected section
            document.getElementById(sectionId).classList.add('active');
            
            // Add active class to clicked tab
            event.target.classList.add('active');
        }

        // Login functions
        function loginDoctor() {
            const username = document.getElementById('doctorUsername').value;
            const password = document.getElementById('doctorPassword').value;
            
            if (username === 'doctor' && password === 'doctor123') {
                currentUser = { type: 'doctor', name: username };
                showSection('doctor');
                showSuccessMessage('Doctor login successful!');
            } else {
                alert('Invalid credentials for doctor login');
            }
        }

        function loginReceptionist() {
            const username = document.getElementById('receptionistUsername').value;
            const password = document.getElementById('receptionistPassword').value;
            
            if (username === 'receptionist' && password === 'recep123') {
                currentUser = { type: 'receptionist', name: username };
                showSection('receptionist');
                showSuccessMessage('Receptionist login successful!');
            } else {
                alert('Invalid credentials for receptionist login');
            }
        }

        // Patient management
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
                diagnosis: diagnosis,
                prescription: prescription,
                followupDate: followupDate,
                date: new Date().toISOString().split('T')[0],
                doctor: currentUser.name
            };

            patients.push(newPatient);
            
            // Clear form
            document.getElementById('prescriptionPatientName').value = '';
            document.getElementById('diagnosis').value = '';
            document.getElementById('prescription').value = '';
            document.getElementById('followupDate').value = '';

            showSuccessMessage('Prescription added successfully!');
            updateDashboard();
            displayPatients();
        }

        // Token generation
        function generateToken() {
            const patientName = document.getElementById('tokenPatientName').value;
            const patientPhone = document.getElementById('tokenPatientPhone').value;
            const department = document.getElementById('department').value;

            if (!patientName || !patientPhone || !department) {
                alert('Please fill all fields');
                return;
            }

            const tokenNumber = `T${String(tokenCounter).padStart(3, '0')}`;
            tokenCounter++;

            const tokenHTML = `
                <div class="token-display">
                    <div class="token-number">${tokenNumber}</div>
                    <p><strong>Patient:</strong> ${patientName}</p>
                    <p><strong>Department:</strong> ${department}</p>
                    <p><strong>Time:</strong> ${new Date().toLocaleTimeString()}</p>
                </div>
            `;

            document.getElementById('tokenDisplay').innerHTML = tokenHTML;

            // Add to patient records
            const newPatient = {
                id: patients.length + 1,
                name: patientName,
                phone: patientPhone,
                department: department,
                token: tokenNumber,
                date: new Date().toISOString().split('T')[0],
                status: 'Waiting'
            };

            patients.push(newPatient);

            // Clear form
            document.getElementById('tokenPatientName').value = '';
            document.getElementById('tokenPatientPhone').value = '';
            document.getElementById('department').value = '';

            showSuccessMessage('Token generated successfully!');
            updateDashboard();
            displayPatients();
        }

        // Bill generation
        function generateBill() {
            const patientName = document.getElementById('billPatientName').value;
            const consultationFee = parseFloat(document.getElementById('consultationFee').value) || 0;
            const medicineCost = parseFloat(document.getElementById('medicineCost').value) || 0;
            const labTests = parseFloat(document.getElementById('labTests').value) || 0;
            const otherCharges = parseFloat(document.getElementById('otherCharges').value) || 0;

            if (!patientName) {
                alert('Please enter patient name');
                return;
            }

            const total = consultationFee + medicineCost + labTests + otherCharges;

            const billHTML = `
                <div class="bill-summary">
                    <h3>Bill Summary</h3>
                    <p><strong>Patient:</strong> ${patientName}</p>
                    <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                    <hr>
                    <div class="bill-item">
                        <span>Consultation Fee</span>
                        <span>₹${consultationFee.toFixed(2)}</span>
                    </div>
                    <div class="bill-item">
                        <span>Medicine Cost</span>
                        <span>₹${medicineCost.toFixed(2)}</span>
                    </div>
                    <div class="bill-item">
                        <span>Lab Tests</span>
                        <span>₹${labTests.toFixed(2)}</span>
                    </div>
                    <div class="bill-item">
                        <span>Other Charges</span>
                        <span>₹${otherCharges.toFixed(2)}</span>
                    </div>
                    <div class="bill-item bill-total">
                        <span>Total Amount</span>
                        <span>₹${total.toFixed(2)}</span>
                    </div>
                </div>
            `;

            document.getElementById('billDisplay').innerHTML = billHTML;

            // Store bill
            const bill = {
                id: bills.length + 1,
                patientName: patientName,
                consultationFee: consultationFee,
                medicineCost: medicineCost,
                labTests: labTests,
                otherCharges: otherCharges,
                total: total,
                date: new Date().toISOString().split('T')[0]
            };

            bills.push(bill);

            showSuccessMessage('Bill generated successfully!');
        }

        // Patient search
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