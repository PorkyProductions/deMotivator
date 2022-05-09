let pdf = navigator.pdfViewerEnabled;
const getPDF = ({ pdf }) => {
    if (pdf) {
        return "PDF_viewerEnabled";
    }
    else {
        return "PDF_viewerDisabled";
    }
};
let PDFviewerStatus = getPDF({ pdf });
export { PDFviewerStatus };
