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
    let userContent = `You are a professional CV generator assistant. Generate a brief, concise CV summary that highlights the key qualifications for the following:\n\n`;

    if (name) userContent += `Full Name: ${name}\n`;
    if (jobTitle)
      userContent += `Job Title: ${jobTitle} (Tailor the summary to suit this role or industry)\n`;
    if (experience)
      userContent += `Work Experience: ${experience} (Summarize key achievements)\n`;
    if (skills)
      userContent += `Key Skills: ${skills} (Focus on the most relevant skills for the role)\n`;
    if (education)
      userContent += `Education: ${education} (Include important academic background)\n`;
    if (certifications)
      userContent += `Certifications: ${certifications} (Include any certifications relevant to the role)\n`;
    if (languages)
      userContent += `Languages: ${languages} (Mention any languages spoken)\n`;

    userContent += `\nPlease provide a **brief summary** that encapsulates the most important aspects of the person's professional background. Focus on the following:
    - Key **skills** and **experience**.
    - **Job title** and **current role** (if given).
    - Brief mention of **education** and **certifications** (if relevant).
    - A short, professional **overview** of the person’s career.\n`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a professional CV generator assistant. Your task is to generate a **brief** professional CV summary based on the given inputs.",
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
