/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const {
    name,
    jobTitle,
    experience,
    skills,
    education,
    certifications,
    languages,
  } = await req.json();

  try {
    // Build the user input string dynamically
    let userContent = `Generate a professional CV summary for:\n`;

    if (name) userContent += `Name: ${name}\n`;
    if (jobTitle) userContent += `Job Title: ${jobTitle}\n`;
    if (experience) userContent += `Work Experience: ${experience}\n`;
    if (skills) userContent += `Key Skills: ${skills}\n`;
    if (education) userContent += `Education: ${education}\n`;
    if (certifications) userContent += `Certifications: ${certifications}\n`;
    if (languages) userContent += `Languages: ${languages}\n`;

    // Call OpenAI API to generate the CV based on the provided fields
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional CV generator assistant.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const cvSummary = response.choices[0]?.message?.content?.trim();
    return NextResponse.json({ cvSummary });
  } catch (error) {
    return NextResponse.json(
      { error: "Error generating CV summary" },
      { status: 500 }
    );
  }
}
