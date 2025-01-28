import { changeColor } from './manager.js';
const uploadFileEl = document.getElementById("members-container");
const uploadEl = document.getElementById("upload");

uploadEl.addEventListener("click", () => {
    changeColor("membersList","white", "green");
    changeColor("allMembers-loan","white", "green");
    changeColor("members-deduction","white", "green");
    changeColor("upload","blue", "white");
    uploadFileEl.innerHTML = `
        <div class="uploadPage">
            <div class="backToMembers">
                <a href="manager.html"><button>Back</button></a>
            </div>
            <form id="upload-file" action="" enctype="multipart/form-data">
                <p>Upload members deduction Schedule</p>
                <input type="file" id="fileInput" accept=".xlsx,.xls" name="excelFile">
                <button type="submit">Upload</button>
            </form>
            <div id="upload-status"></div>
            <pre id="output"></pre>
        </div>
    `;

    // Add event listener for the dynamically added form
    const uploadForm = document.getElementById('upload-file');
    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const upLoadInput = document.getElementById("fileInput");
        const file = upLoadInput.files[0];

        if (!file) {
            document.getElementById('upload-status').textContent = 'Please select a file.';
            return;
        }

        // Validate file type
        const allowedExtensions = ['.xlsx', '.xls'];
        const fileName = file.name;
        const fileExtension = fileName.slice(fileName.lastIndexOf('.'));

        if (!allowedExtensions.includes(fileExtension)) {
            document.getElementById('upload-status').textContent = 'Invalid file type. Please upload an Excel file.';
            return;
        }

        // If valid, submit the file or process further
        document.getElementById('upload-status').textContent = 'File is valid. Processing...';
        processDeductionFile(file);
    });
});

function processDeductionFile(file) {
    const reader = new FileReader();

    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Assume the first sheet
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

        // Convert to JSON to validate structure
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        document.getElementById("output").textContent = JSON.stringify(jsonData, null, 2);
        const deduction = JSON.stringify(jsonData, null, 2);
        // Save file in Local Storage
        localStorage.setItem("deduction", deduction);

        // Example: Check if required headers exist
        const requiredHeaders = ['STAFF ID', 'STAFF NAME', 'BANK NAME', 'ACCOUNT ID', 'ITEM CODE', 'ITEM DESC', 'OFFICE', 'SAVINGS', 'LOAN', 'TOTAL'];

        const fileHeaders = Object.keys(jsonData[0]); // Headers in the first row

        const isValid = requiredHeaders.every(header => fileHeaders.includes(header));
        if (isValid) {
            document.getElementById('upload-status').textContent = 'File format is correct. Submitting...';
        } else {
            document.getElementById('upload-status').textContent = 'Invalid file format. Required columns: ' + requiredHeaders.join(', ');
        }
    };

    reader.readAsArrayBuffer(file);
}
