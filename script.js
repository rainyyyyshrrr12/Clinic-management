function loginDoctor(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    const username = document.getElementById("doctorUsername").value.trim();
    const password = document.getElementById("doctorPassword").value.trim();

    if (username && password) {
        // ✅ Redirect to doctor dashboard
        window.location.href = "dash.html";
    } else {
        alert("Please enter both username and password.");
    }
}

function loginreception(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    const username = document.getElementById("receptionistUsername").value.trim();
    const password = document.getElementById("receptionistPassword").value.trim();

    if (username && password) {
        // ✅ Redirect to doctor dashboard
        window.location.href = "recep.html";
    } else {
        alert("Please enter both username and password.");
    }
}
 let currentUser = null;
        let patients = [];
        let tokenCounter = 1;
        let bills = [];
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
