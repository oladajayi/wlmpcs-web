import { changeColor } from './manager.js';

const uploadFileEl = document.getElementById("members-container");
const uploadEl = document.getElementById("upload");

uploadEl.addEventListener("click", () => {
    changeColor("membersList", "white", "green");
    changeColor("allMembers-loan", "white", "green");
    changeColor("members-deduction", "white", "green");
    changeColor("upload", "blue", "white");

    uploadFileEl.innerHTML = `
        <div class="uploadPage container text-center shadow-lg p-4">
            <form id="upload-file" action="" enctype="multipart/form-data" class="bg-light p-3 rounded">
                <p class="fw-bold text-primary">Upload Members Deduction Schedule</p>
                <input type="file" id="fileInput" accept=".xlsx,.xls" name="excelFile" class="form-control mb-3">
                <button type="submit" class="btn btn-success w-100">Upload</button>
            </form>
            <div id="upload-status" class="mt-3 text-danger fw-bold"></div>
            <pre id="output" class="bg-dark text-white p-3 rounded"></pre>
        </div>
    `;

    // Handle file upload event
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

        // If valid, process the file
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
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);

        document.getElementById("output").textContent = JSON.stringify(jsonData, null, 2);
        localStorage.setItem("deduction", JSON.stringify(jsonData, null, 2));

        // Validate required headers
        const requiredHeaders = ['STAFF ID', 'STAFF NAME', 'BANK NAME', 'ACCOUNT ID', 'ITEM CODE', 'ITEM DESC', 'OFFICE', 'SAVINGS', 'LOAN', 'TOTAL'];
        const fileHeaders = Object.keys(jsonData[0]);

        const isValid = requiredHeaders.every(header => fileHeaders.includes(header));
        document.getElementById('upload-status').textContent = isValid
            ? '✅ File format is correct. Submitting...'
            : '❌ Invalid file format. Required columns: ' + requiredHeaders.join(', ');
    };

    reader.readAsArrayBuffer(file);
}
