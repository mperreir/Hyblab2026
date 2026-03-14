function generatePDF() {
    // trigger ctrl+p
    window.print();
}

export default function ExportPDF() {
    return (
        <div className="flex justify-center">
            <button
                type="button"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                className="shadow-xl bg-white hover:bg-blue-600 hover:text-white text-accent-blue animate-all duration-300 font-bold py-2 px-6 mb-4 rounded-full focus:outline-none print:hidden"
                onClick={generatePDF}
            >
            EXPORTER L’ARTICLE EN PDF
            </button>
        </div>
    );
}