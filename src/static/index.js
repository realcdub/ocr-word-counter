const submitButton = document.querySelector(".submit");
const imageDisplay = document.querySelector(".selected-image");
const imageInput = document.querySelector(".file-input");
const feedback = document.querySelector(".response-text");
const wordCount = document.querySelector(".word-count");

imageInput.addEventListener("change", (event) => {
	const imageFile = event.target.files[0];
	imageDisplay.src = URL.createObjectURL(imageFile);
});

submitButton.addEventListener("click", async () => {
	if (imageInput.files.length > 0) {
		const formData = new FormData();
		formData.append("file", imageInput.files[0]);
		const response = await fetch("/processImage", {
			"Content-Type": "multipart/form-data",
			method: "POST",
			body: formData
		});

		if (response.ok) {
			const responseText = await response.text();
			feedback.innerHTML = "Text: " + responseText;
			wordCount.innerHTML = "Word Count: " + responseText.trim().split(" ").length;
		}
	}
});
