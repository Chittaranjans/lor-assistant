import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import supabase, { isDbEnabled } from '@/lib/db';

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json();

    let prompt: string;
    if (type === 'form') {
      // Construct detailed prompt from form data
      const {
        applicantName,
        applicantCurrentRole,
        applicantInstitution,
        relationship,
        relationshipCapacity,
        duration,
        contextOfRelationship,
        targetProgram,
        targetInstitution,
        applicationType,
        fieldOfStudy,
        keySkills,
        notableAchievements,
        academicPerformance,
        technicalSkills,
        softSkills,
        leadershipQualities,
        workEthic,
        keyProject,
        achievementMetrics,
        challengeOvercome,
        uniqueContribution,
        comparisonToPeers,
        overallAssessment,
        referrerName,
        referrerTitle,
        referrerInstitution,
        referrerDepartment,
        referrerEmail,
        referrerPhone,
        tone,
        recommendationStrength,
        letterFocus
      } = data;

      prompt = `Write a professional letter of recommendation in plain text format (no markdown, no bold text, no headings). Use only the information provided below. Do not add any information that is not provided, such as phone numbers, addresses, or company details that aren't specified.

APPLICANT INFORMATION:
- Name: ${applicantName}
- Current Role: ${applicantCurrentRole}
- Current Institution: ${applicantInstitution}

RELATIONSHIP DETAILS:
- Relationship Type: ${relationship}
- Duration: ${duration}
- Context: ${contextOfRelationship}

TARGET POSITION/PROGRAM:
- Target Program: ${targetProgram}
- Target Institution: ${targetInstitution}
- Application Type: ${applicationType}

ACADEMIC/PROFESSIONAL QUALIFICATIONS:
- Field of Study: ${fieldOfStudy}
- Key Skills: ${keySkills}
- Notable Achievements: ${notableAchievements}
${academicPerformance ? `- Academic Performance: ${academicPerformance}` : ''}

PERSONAL & PROFESSIONAL QUALITIES:
${technicalSkills ? `- Technical Skills: ${technicalSkills}` : ''}
${softSkills ? `- Soft Skills: ${softSkills}` : ''}
${leadershipQualities ? `- Leadership Qualities: ${leadershipQualities}` : ''}
${workEthic ? `- Work Ethic: ${workEthic}` : ''}

SPECIFIC EXAMPLES:
- Key Project: ${keyProject}
${achievementMetrics ? `- Achievement Metrics: ${achievementMetrics}` : ''}
${challengeOvercome ? `- Challenge Overcome: ${challengeOvercome}` : ''}
${uniqueContribution ? `- Unique Contribution: ${uniqueContribution}` : ''}

OVERALL ASSESSMENT:
- Comparison to Peers: ${comparisonToPeers}
${overallAssessment ? `- Overall Assessment: ${overallAssessment}` : ''}

REFERRER INFORMATION:
- Name: ${referrerName}
- Title: ${referrerTitle}
- Institution: ${referrerInstitution}
${referrerDepartment ? `- Department: ${referrerDepartment}` : ''}
- Email: ${referrerEmail}
${referrerPhone ? `- Phone: ${referrerPhone}` : ''}

LETTER STYLE:
- Tone: ${tone}
- Recommendation Strength: ${recommendationStrength}
- Letter Focus: ${letterFocus}

INSTRUCTIONS:
1. Write the letter in proper business letter format
2. Start with the date (use today's date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })})
3. Address it appropriately based on application type (${applicationType})
4. Include only the information provided - do not invent details
5. Adjust length based on information provided: aim for 300-400 words if detailed data is given, 100-200 words for basic information
6. Use the referrer's information for the signature
7. Use plain text only - no **bold**, no ### headings, no formatting
8. Make it sound natural and professional
9. Focus on ${letterFocus} aspects based on the letter focus preference
10. Do not include contact information at the end unless a phone number is specifically provided in the referrer details

Generate the complete letter:`;
    } else if (type === 'prompt') {
      prompt = `You are a Letter of Recommendation (LOR) writing assistant. Your task is to generate professional letters of recommendation based on user prompts.

IMPORTANT: If the user's prompt is NOT related to generating a letter of recommendation, scholarship applications, job recommendations, or academic admissions, respond with a helpful message explaining that you can assist with creating professional letters of recommendation. Do not generate content unrelated to LOR writing.

For valid LOR requests, follow these instructions:

CRITICAL INSTRUCTIONS:
1. Do NOT add any names, companies, addresses, phone numbers, emails, or specific details that are not explicitly mentioned in the user's prompt.
2. If the prompt lacks specific details (like names, relationships, achievements), create a generic template letter but do not invent specific information.
3. Use today's date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
4. Write in plain text format only (no markdown, no bold, no headings).
5. Adjust length based on prompt detail: aim for 100-200 words for basic prompts, 300-400 words for detailed prompts.
6. If the prompt is too vague, generate a sample letter with placeholder text indicating what information is needed.

User's prompt: "${data.prompt}"

If this prompt is about generating a letter of recommendation, create the letter. Otherwise, respond with: "I'm here to help you create professional letters of recommendation! Please provide details about the person you want to recommend, your relationship with them, their achievements, and the purpose of the recommendation (job, scholarship, etc.)."`;
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    const completion = await client.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2048,
    });

    const letter = completion.choices[0].message.content ?? '';

    // Save to database (optional - don't fail if DB is unavailable)
    try {
      if (isDbEnabled()) {
        // Calculate word count
        const wordCount = letter.split(/\s+/).filter((word) => word.length > 0).length;

        const { error: letterError } = await supabase.from('letters').insert({
          type,
          title: type === 'form' ? `LOR for ${data.applicantName} - ${data.targetProgram}` : 'Custom LOR',
          prompt,
          form_data: type === 'form' ? data : null,
          generated_letter: letter,
          tone: type === 'form' ? data.tone : 'Professional',
          lor_type: type === 'form' ? data.applicationType : 'General',
          strength: type === 'form' ? data.recommendationStrength : 'Recommend',
          word_count: wordCount,
        });

        if (letterError) throw letterError;

        // Track API usage
        const { error: usageError } = await supabase.from('api_usage').insert({
          api_provider: 'groq',
          model_used: 'openai/gpt-oss-120b',
          tokens_used: Math.ceil(letter.length / 4),
          endpoint: '/api/generate',
        });

        if (usageError) throw usageError;

        console.log('Letter saved to database successfully');
      } else {
        console.warn('Database disabled — skipping save.');
      }
    } catch (dbError) {
      console.warn('Database save failed (non-critical):', (dbError as any)?.message || dbError);
      // Don't fail the request if DB save fails - the letter generation worked
    }

    return NextResponse.json({ letter });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate letter' }, { status: 500 });
  }
}