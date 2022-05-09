let pdf: boolean = navigator.pdfViewerEnabled;


const getPDF = ({ pdf }: { pdf: boolean; }): "PDF_viewerEnabled" | "PDF_viewerDisabled" => {
    if (pdf) {
        return "PDF_viewerEnabled";
    }
    else {
        return "PDF_viewerDisabled";
    }
}

let PDFviewerStatus = getPDF({ pdf });

export { PDFviewerStatus };