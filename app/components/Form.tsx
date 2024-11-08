/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";

const Form = ({ onGenerate }: { onGenerate: (formData: any) => void }) => {
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");
  const [certifications, setCertifications] = useState("");
  const [languages, setLanguages] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVoiceInput = (
    setField: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event: {
      results: { transcript: React.SetStateAction<string> }[][];
    }) => {
      setField(event.results[0][0].transcript);
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !jobTitle || !skills) {
      setError("Name, Job Title, and Skills are mandatory fields.");
      return;
    }

    setError("");
    setLoading(true);

    await onGenerate({
      name: name || null,
      jobTitle: jobTitle || null,
      experience: experience || null,
      skills: skills || null,
      education: education || null,
      certifications: certifications || null,
      languages: languages || null,
    });

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {}
      {error && <div className="error-message">{error}</div>}

      {}
      <div className="input-group">
        <label>Name:</label>
        <div className="input-wrapper">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <button
            type="button"
            className="voice-button"
            onClick={() => handleVoiceInput(setName)}
          >
            🎙️
          </button>
        </div>
      </div>

      <div className="input-group">
        <label>Job Title:</label>
        <div className="input-wrapper">
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Enter your job title"
          />
          <button
            type="button"
            className="voice-button"
            onClick={() => handleVoiceInput(setJobTitle)}
          >
            🎙️
          </button>
        </div>
      </div>

      <div className="input-group">
        <label>Work Experience:</label>
        <div className="input-wrapper">
          <textarea
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="Describe your work experience"
          />
          <button
            type="button"
            className="voice-button"
            onClick={() => handleVoiceInput(setExperience)}
          >
            🎙️
          </button>
        </div>
      </div>

      <div className="input-group">
        <label>Skills:</label>
        <div className="input-wrapper">
          <textarea
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="List your skills"
          />
          <button
            type="button"
            className="voice-button"
            onClick={() => handleVoiceInput(setSkills)}
          >
            🎙️
          </button>
        </div>
      </div>

      <div className="input-group">
        <label>Education:</label>
        <div className="input-wrapper">
          <textarea
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            placeholder="Describe your education background"
          />
          <button
            type="button"
            className="voice-button"
            onClick={() => handleVoiceInput(setEducation)}
          >
            🎙️
          </button>
        </div>
      </div>

      <div className="input-group">
        <label>Certifications:</label>
        <div className="input-wrapper">
          <textarea
            value={certifications}
            onChange={(e) => setCertifications(e.target.value)}
            placeholder="List any certifications"
          />
          <button
            type="button"
            className="voice-button"
            onClick={() => handleVoiceInput(setCertifications)}
          >
            🎙️
          </button>
        </div>
      </div>

      <div className="input-group">
        <label>Languages:</label>
        <div className="input-wrapper">
          <textarea
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
            placeholder="List languages you speak"
          />
          <button
            type="button"
            className="voice-button"
            onClick={() => handleVoiceInput(setLanguages)}
          >
            🎙️
          </button>
        </div>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Generating..." : "Generate CV"}
      </button>
    </form>
  );
};

export default Form;
