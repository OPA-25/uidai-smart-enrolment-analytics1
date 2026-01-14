// import React from "react";

// const ExportButtons = ({ insights }) => {

//   const downloadCSV = () => {
//     window.open("http://localhost:9090/api/export/csv", "_blank");
//   };

//   const downloadPDF = async () => {
//     const response = await fetch("http://localhost:9090/api/export/pdf", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(insights)
//     });

//     const blob = await response.blob();
//     const url = window.URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "uidai_insights_report.pdf";
//     a.click();
//   };

//   return (
//     <div className="flex flex-wrap gap-4 mb-10">
//       <button
//         onClick={downloadCSV}
//         className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
//       >
//         ⬇ Export CSV
//       </button>

//       <button
//         onClick={downloadPDF}
//         className="px-6 py-3 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700 transition"
//       >
//         📄 Export PDF Report
//       </button>
//     </div>
//   );
// };

// export default ExportButtons;

import React, { useState } from "react";

const ExportButtons = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const downloadCSV = () => {
    window.open("http://localhost:9090/api/export/csv", "_blank");
    setSuccess("CSV exported successfully for data analysis");
  };

  const downloadPDF = async () => {
    try {
      setLoading(true);
      setSuccess("");

      const response = await fetch("http://localhost:9090/api/export/pdf", {
        method: "GET"
      });

      if (!response.ok) throw new Error("PDF download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(
        new Blob([blob], { type: "application/pdf" })
      );

      const a = document.createElement("a");
      a.href = url;
      a.download = "uidai_insights_report.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();

      setSuccess("PDF governance report generated successfully");

    } catch (error) {
      console.error(error);
      setSuccess("Failed to generate PDF report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Header Card */}
      <div className="bg-white shadow-xl rounded-2xl p-6 border-l-8 border-indigo-600">
        <h2 className="text-2xl font-bold text-gray-800">
          📑 Governance Export & Reporting 
        </h2>
        <p className="text-gray-600 mt-2">
          Generate policy-ready reports from Aadhaar enrolment & demographic insights
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-indigo-50 p-4 rounded-xl shadow">
          <h4 className="font-semibold">📊 Data Scope</h4>
          <p className="text-sm text-gray-600">State & District Level Insights</p>
        </div>

        <div className="bg-purple-50 p-4 rounded-xl shadow">
          <h4 className="font-semibold">🏛 Governance Use</h4>
          <p className="text-sm text-gray-600">Policy planning & delay reduction</p>
        </div>

        <div className="bg-green-50 p-4 rounded-xl shadow">
          <h4 className="font-semibold">⏱ Generated</h4>
          <p className="text-sm text-gray-600">{new Date().toLocaleString()}</p>
        </div>
      </div>

      {/* Export Actions */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={downloadCSV}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
        >
          ⬇ Export CSV (Analyst Use)
        </button>

        <button
          onClick={downloadPDF}
          disabled={loading}
          className="px-6 py-3 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700 transition disabled:opacity-50"
        >
          {loading ? "📄 Generating PDF..." : "📄 Export PDF (Management)"}
        </button>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-100 text-green-800 p-4 rounded-xl shadow">
          ✅ {success}
        </div>
      )}

      {/* Footer Note */}
      <div className="text-sm text-gray-500 italic">
        *This report module enables non-technical government officials to access
        decision-ready Aadhaar insights without database interaction.*
      </div>
    </div>
  );
};

export default ExportButtons;
