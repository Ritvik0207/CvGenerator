/* eslint-disable @typescript-eslint/no-explicit-any */
// app/page.tsx
"use client";
import { useState } from "react";
import Form from "./components/Form";
import GeneratePdfButton from "./components/GeneratePdfButton";

export default function Home() {
  const [cvSummary, setCvSummary] = useState<string>("");

  // Function to handle form submission and generate the CV summary
  const generateCv = async (formData: any) => {
    const response = await fetch("/api/generateCV", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setCvSummary(data.cvSummary); // Assuming the response contains a 'cvSummary' field
  };

  return (
    <div className="container">
      <h1>Professional CV Generator</h1>
      {/* Form Component where user inputs data */}
      <Form onGenerate={generateCv} />

      {/* Display the generated CV summary */}
      {cvSummary && (
        <div id="cv-summary">
          <h2>Generated CV Summary</h2>
          <p id="pdf-summary">{cvSummary}</p>
        </div>
      )}

      {/* The button to download the CV as a PDF */}
      {cvSummary && <GeneratePdfButton contentId="pdf-summary" />}
    </div>
  );
}
