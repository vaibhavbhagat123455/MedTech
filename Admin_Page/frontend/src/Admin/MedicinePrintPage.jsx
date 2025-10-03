import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import JsBarcode from "jsbarcode";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import NavBar from "../Common/NavBar";

export default function MedicinePrintPage() {
    const location = useLocation();
    const { quantity } = location.state || { quantity: 1 };
    const [medicines, setMedicines] = useState([]);
    const [rows, setRows] = useState(2);
    const [cols, setCols] = useState(5);
    const printRef = useRef();

    // Fetch medicines
    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8080/api/admin/getlatestmeds/${quantity}`
                );
                setMedicines(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchMedicines();
    }, [quantity]);

    // Generate barcodes
    useEffect(() => {
        medicines.forEach((med, mIdx) => {
            med.SubTextCode.forEach((sub, idx) => {
                const el = document.getElementById(`barcode-${mIdx}-${idx}`);
                if (el)
                    JsBarcode(el, sub.TextCode, {
                        format: "CODE128",
                        width: 1,
                        height: 40,
                        displayValue: false,
                        margin: 0,
                    });
            });
        });
    }, [medicines, rows, cols]);

    // Generate PDF using html2canvas + jsPDF
    const generatePDF = async () => {
        if (!printRef.current) return;

        const pdf = new jsPDF("p", "mm", "a4"); // portrait, mm, A4 size

        const element = printRef.current;
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("medicine-strips.pdf");
    };

    if (!medicines.length) return <div>Loading...</div>;

    return (
        <>
        <NavBar/>
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Layout controls - hidden in PDF */}
            <div className="mb-4 flex items-center gap-4">
                <label>
                    Rows:
                    <input
                        type="number"
                        min="1"
                        value={rows}
                        onChange={(e) => setRows(parseInt(e.target.value) || 1)}
                        className="ml-2 border rounded px-2 py-1 w-16"
                    />
                </label>
                <label>
                    Columns:
                    <input
                        type="number"
                        min="1"
                        value={cols}
                        onChange={(e) => setCols(parseInt(e.target.value) || 1)}
                        className="ml-2 border rounded px-2 py-1 w-16"
                    />
                </label>
                <button
                    onClick={generatePDF}
                    className="ml-4 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                >
                    Download PDF
                </button>
            </div>

            {/* Printable content */}
            <div ref={printRef} className="flex flex-col bg-white p-2 ">
                {medicines.map((med, mIdx) => (
                    <div
                        key={mIdx}
                        className="p-4 rounded-xl flex flex-col relative"
                    >

                        {/* QR Code top-right */}


                        {/* Barcode strip */}
                        <div className="mt-10 flex justify-center">
                            <div
                                className="bg-gray-200 rounded-lg p-4 flex flex-wrap justify-start"
                                style={{
                                    width: `${cols * 90}px`,
                                    minWidth: "200px",
                                    maxWidth: "90%",
                                    gap: "8px",
                                }}
                            >
                                {med.SubTextCode.map((sub, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-center bg-white p-1 rounded-md shadow-sm"
                                        style={{ width: "100px", height: "50px" }}
                                    >
                                        <svg
                                            id={`barcode-${mIdx}-${idx}`}
                                            style={{ width: "100%", height: "100%" }}
                                        />
                                    </div>
                                ))}
                                <div className="">
                                    <QRCodeCanvas value={med.TextCode} size={70} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}
