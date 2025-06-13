
 
 document.getElementById('patient-form').addEventListener('submit', function (e) {
        e.preventDefault();

        // Retrieve form values
        const name = document.getElementById('patient-name').value.trim();
        const age = document.getElementById('age').value.trim();
        const contact = document.getElementById('contact').value.trim();
        const prescription = document.getElementById('prescription').value.trim();

        // Validate
        if (name && age && contact && prescription) {
            // Add to table
            const tbody = document.getElementById('patient-table-body');
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${name}</td>
                <td>${age}</td>
                <td>${contact}</td>
                <td>${prescription}</td>`;
            tbody.prepend(row);

            // Clear form
            document.getElementById('patient-form').reset();
        }
    });
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAFXbvaWtAnO6J9wtZDORTQkLqzArbvRvc",
    authDomain: "clinic-mangemnet.firebaseapp.com",
    projectId: "clinic-mangemnet",
    storageBucket: "clinic-mangemnet.firebasestorage.app",
    messagingSenderId: "548403612632",
    appId: "1:548403612632:web:3efd80404a2f6a2ddb80ad",
    measurementId: "G-2PSEL2GSG5"
  };

     firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    document.getElementById('patient-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        // Retrieve form values
        const name = document.getElementById('patient-name').value.trim();
        const age = parseInt(document.getElementById('age').value.trim(), 10);
        const contact = document.getElementById('contact').value.trim();
        const prescription = document.getElementById('prescription').value.trim();

        try {
            // Add to Firebase
            await db.collection('patients').add({ name, age, contact, prescription });

            alert('Patient successfully added');
            document.getElementById('patient-form').reset();

        } catch (error) {
            console.error('Error adding patient: ', error);
            alert('Failed to add patient');
        }
    });