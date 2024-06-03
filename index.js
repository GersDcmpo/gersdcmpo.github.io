// Get the canvas element.
const canvas = document.getElementById('pdf-canvas');

// Get the PDF file URL.
const pdfUrl = './file/deOcampo_Resume.pdf';

pdfjsLib.GlobalWorkerOptions.workerSrc = './pdf.worker.mjs';

// Load the PDF file using PDF.js.
pdfjsLib.getDocument(pdfUrl).promise.then(function (pdfDoc) {
	// Get the first page of the PDF file.
	pdfDoc
		.getPage(1)
		.then(function (page) {
			const viewport = page.getViewport({ scale: 1 });

			// Set the canvas dimensions to match the PDF page size.
			canvas.width = viewport.width;
			canvas.height = viewport.height;

			// Set the canvas rendering context.
			const ctx = canvas.getContext('2d');

			const renderContext = {
				canvasContext: ctx,
				viewport: viewport,
			};

			// Render the PDF page to the canvas.
			page.render(renderContext);
		})
		.then(function () {
			console.log('Rendering complete');
		});
});