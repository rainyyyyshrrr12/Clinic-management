  let currentUser = null;
        let patients = [];
        let tokenCounter = 1;
        let bills = [];
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
        