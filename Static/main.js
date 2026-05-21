const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");
const previewImg = document.getElementById("preview-img");

if (fileInput) {
    fileInput.addEventListener("change", function () {
        const file = this.files[0];

        if (file) {
            preview.style.display = "block";
            previewImg.src = URL.createObjectURL(file);
        }
    });
}

function openCamera() {
    document
        .getElementById("fileInput")
        .click();
}

document

    .getElementById("fileInput")
    .addEventListener("change", function () {
        if (this.files.length > 0) {
            document
                .getElementById("submitBtn")
                .click();
        }
    });