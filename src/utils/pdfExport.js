import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
export const exportToPDF = async (elementId, filename) => {
    try {
        const element = document.getElementById(elementId);
        if (!element)
            throw new Error('Element not found');
        const canvas = await html2canvas(element, {
            scale: 2,
            backgroundColor: '#ffffff',
            logging: false,
        });
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();
        const ratio = canvas.height / canvas.width;
        let imgHeight = height - 20;
        let imgWidth = width - 20;
        if (imgHeight / imgWidth > ratio) {
            imgHeight = imgWidth * ratio;
        }
        else {
            imgWidth = imgHeight / ratio;
        }
        const x = (width - imgWidth) / 2;
        const y = 10;
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', x, y, imgWidth, imgHeight);
        pdf.save(filename);
    }
    catch (error) {
        console.error('PDF Export Error:', error);
        throw error;
    }
};
export const generateSlidesPDF = (slides, filename) => {
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });
    slides.forEach((slide, index) => {
        if (index > 0) {
            pdf.addPage();
        }
        const pageHeight = pdf.internal.pageSize.getHeight();
        const pageWidth = pdf.internal.pageSize.getWidth();
        const margin = 15;
        // Title
        pdf.setFontSize(24);
        pdf.text(slide.title, margin, margin + 10);
        // Content
        pdf.setFontSize(11);
        const splitText = pdf.splitTextToSize(slide.content, pageWidth - margin * 2);
        pdf.text(splitText, margin, margin + 25);
        // Footer
        pdf.setFontSize(8);
        pdf.text(`Page ${index + 1}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    });
    pdf.save(filename);
};
