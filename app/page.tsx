/* eslint-disable @typescript-eslint/no-explicit-any */
// app/page.tsx
"use client";
import { useState } from "react";
import Form from "./components/Form";
import GeneratePdfButton from "./components/GeneratePdfButton";

export default function Home() {
  const [cvSummary, setCvSummary] = useState<string>("");

  const generateCv = async (formData: any) => {
    const response = await fetch("/api/generateCV", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setCvSummary(data.cvSummary);
  };

  return (
    <div className="container">
      <h1>Professional CV Generator</h1>
      {}
      <Form onGenerate={generateCv} />

      {}
      {cvSummary && (
        <div id="cv-summary">
          <h2>Generated CV Summary</h2>
          <p id="pdf-summary">{cvSummary}</p>
        </div>
      )}

      {}
      {cvSummary && <GeneratePdfButton contentId="pdf-summary" />}
    </div>
  );
}
