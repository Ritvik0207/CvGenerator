/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// app/components/GeneratePdfButton.tsx
"use client";

import React from "react";
import { jsPDF } from "jspdf";

const GeneratePdfButton = ({ contentId }: { contentId: string }) => {
  const handleGeneratePdf = () => {
    const doc = new jsPDF();
    const content = document.getElementById(contentId);

    if (content) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);

      doc.setFontSize(16);
      doc.text("Generated CV", 20, 20);

      doc.setFontSize(12);
      const margin = 20;
      const pageHeight = doc.internal.pageSize.height;
      let currentHeight = 40;

      const lines = doc.splitTextToSize(content.innerText, 180);
      lines.forEach((line: string | string[], index: any) => {
        if (currentHeight + 10 > pageHeight - margin) {
          doc.addPage();
          currentHeight = margin;
        }
        doc.text(line, margin, currentHeight);
        currentHeight += 10;
      });

      doc.save("generated-cv.pdf");
    }
  };

  return <button onClick={handleGeneratePdf}>Download CV as PDF</button>;
};

export default GeneratePdfButton;
