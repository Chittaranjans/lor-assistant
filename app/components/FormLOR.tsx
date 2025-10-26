'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, AlertCircle } from 'lucide-react';

type FormData = {
  // Applicant Information
  applicantName: string;
  applicantCurrentRole: string;
  applicantInstitution: string;

  // Relationship Details
  relationship: string;
  relationshipCapacity: string;
  duration: string;
  contextOfRelationship: string;

  // Target Position/Program
  targetProgram: string;
  targetInstitution: string;
  applicationType: string;

  // Academic/Professional Qualifications
  fieldOfStudy: string;
  keySkills: string;
  notableAchievements: string;
  academicPerformance: string;

  // Personal & Professional Qualities
  technicalSkills: string;
  softSkills: string;
  leadershipQualities: string;
  workEthic: string;

  // Specific Examples & Stories
  keyProject: string;
  achievementMetrics: string;
  challengeOvercome: string;
  uniqueContribution: string;

  // Comparison & Standing
  comparisonToPeers: string;
  overallAssessment: string;

  // Referrer Information
  referrerName: string;
  referrerTitle: string;
  referrerInstitution: string;
  referrerDepartment: string;
  referrerEmail: string;
  referrerPhone: string;

  // Letter Style
  tone: string;
  recommendationStrength: string;
  letterFocus: string;
};

interface FormLORProps {
  onGenerate: (letter: string) => void;
  onStartGenerating: () => void;
}

export default function FormLOR({ onGenerate, onStartGenerating }: FormLORProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const onSubmit = async (data: FormData) => {
    onStartGenerating();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'form', data }),
      });
      const result = await response.json();
      if (result.letter) {
        onGenerate(result.letter);
      } else {
        setError(result.error || 'Failed to generate letter');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
          <AlertCircle className="w-4 h-4 mr-2" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Section 1: About the Applicant */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-slate-800 border-b-2 pb-1">About the Applicant</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
            <input
              {...register('applicantName', { required: 'Applicant name is required' })}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black text-sm"
              placeholder="Enter applicant's full name"
            />
            {errors.applicantName && <p className="text-red-500 text-xs mt-1">{errors.applicantName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Current Role/Position *</label>
            <input
              {...register('applicantCurrentRole', { required: 'Current role is required' })}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black text-sm"
              placeholder="e.g., Software Engineer, Graduate Student"
            />
            {errors.applicantCurrentRole && <p className="text-red-500 text-xs mt-1">{errors.applicantCurrentRole.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Current Institution/Company *</label>
          <input
            {...register('applicantInstitution', { required: 'Institution is required' })}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black text-sm"
            placeholder="Where they currently study/work"
          />
          {errors.applicantInstitution && <p className="text-red-500 text-xs mt-1">{errors.applicantInstitution.message}</p>}
        </div>
      </div>

      {/* Section 2: Your Relationship */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-slate-800 border-b-2 pb-1">Your Relationship</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Relationship Type *</label>
            <select
              {...register('relationship', { required: 'Relationship type is required' })}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black text-sm"
            >
              <option value="">Select relationship</option>
              <option value="Supervisor">Supervisor/Manager</option>
              <option value="Professor">Professor/Instructor</option>
              <option value="Colleague">Colleague</option>
              <option value="Mentor">Mentor</option>
              <option value="Research Advisor">Research Advisor</option>
              <option value="Teaching Assistant">Teaching Assistant</option>
            </select>
            {errors.relationship && <p className="text-red-500 text-xs mt-1">{errors.relationship.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Duration of Relationship *</label>
            <input
              {...register('duration', { required: 'Duration is required' })}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black text-sm"
              placeholder="e.g., 2 years, 1.5 years, 6 months"
            />
            {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Context of Your Relationship *</label>
          <textarea
            {...register('contextOfRelationship', { required: 'Context is required' })}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-16 text-black text-sm"
            placeholder="Describe how you worked together (e.g., 'I supervised their work on the AI research project' or 'They were my student in Advanced Algorithms class')"
          />
          {errors.contextOfRelationship && <p className="text-red-500 text-xs mt-1">{errors.contextOfRelationship.message}</p>}
        </div>
      </div>

      {/* Section 3: Target Position/Program */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-slate-800 border-b-2 pb-1">Target Position/Program</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Target Program/Position *</label>
            <input
              {...register('targetProgram', { required: 'Target program is required' })}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black text-sm"
              placeholder="e.g., MBA Program, Software Engineer, PhD Program"
            />
            {errors.targetProgram && <p className="text-red-500 text-xs mt-1">{errors.targetProgram.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Target Institution *</label>
            <input
              {...register('targetInstitution', { required: 'Target institution is required' })}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black text-sm"
              placeholder="e.g., Stanford University, Google, Microsoft"
            />
            {errors.targetInstitution && <p className="text-red-500 text-xs mt-1">{errors.targetInstitution.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Application Type *</label>
          <select
            {...register('applicationType', { required: 'Application type is required' })}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black text-sm"
          >
            <option value="">Select type</option>
            <option value="Academic">Academic Program (University/College)</option>
            <option value="Job">Job/Employment</option>
            <option value="Scholarship">Scholarship/Fellowship</option>
            <option value="Internship">Internship</option>
          </select>
          {errors.applicationType && <p className="text-red-500 text-xs mt-1">{errors.applicationType.message}</p>}
        </div>
      </div>

      {/* Section 4: Academic/Professional Qualifications */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-slate-800 border-b-2 pb-1">Academic/Professional Qualifications</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Field of Study/Major *</label>
            <input
              {...register('fieldOfStudy', { required: 'Field of study is required' })}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black text-sm"
              placeholder="e.g., Computer Science, Business Administration"
            />
            {errors.fieldOfStudy && <p className="text-red-500 text-xs mt-1">{errors.fieldOfStudy.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Academic Performance</label>
            <select
              {...register('academicPerformance')}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black text-sm"
            >
              <option value="">Select performance level</option>
              <option value="Top 5%">Top 5% of class</option>
              <option value="Top 10%">Top 10% of class</option>
              <option value="Top 25%">Top 25% of class</option>
              <option value="Above Average">Above average</option>
              <option value="Excellent">Excellent (A/A+ grades)</option>
              <option value="Outstanding">Outstanding performance</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Key Technical/Professional Skills *</label>
          <textarea
            {...register('keySkills', { required: 'Key skills are required' })}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-16 text-black text-sm"
            placeholder="List their most important skills (e.g., Python, JavaScript, Machine Learning, Project Management)"
          />
          {errors.keySkills && <p className="text-red-500 text-xs mt-1">{errors.keySkills.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Notable Achievements/Projects *</label>
          <textarea
            {...register('notableAchievements', { required: 'Notable achievements are required' })}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-16 text-black text-sm"
            placeholder="Describe their major accomplishments, awards, or projects"
          />
          {errors.notableAchievements && <p className="text-red-500 text-xs mt-1">{errors.notableAchievements.message}</p>}
        </div>
      </div>

      {/* Section 5: Personal & Professional Qualities */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-slate-800 border-b-2 pb-1">Personal & Professional Qualities</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Soft Skills & Character Traits</label>
            <textarea
              {...register('softSkills')}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-16 text-black text-sm"
              placeholder="e.g., Communication, teamwork, problem-solving, adaptability"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Leadership & Initiative</label>
            <textarea
              {...register('leadershipQualities')}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-16 text-black text-sm"
              placeholder="Leadership roles, mentoring others, taking initiative"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Work Ethic & Reliability</label>
          <textarea
            {...register('workEthic')}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-14 text-black text-sm"
            placeholder="Their dedication, reliability, and work habits"
          />
        </div>
      </div>

      {/* Section 6: Specific Examples */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-slate-800 border-b-2 pb-1">Specific Examples & Stories</h3>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Key Project or Initiative *</label>
          <textarea
            {...register('keyProject', { required: 'A key project example is required' })}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-16 text-black text-sm"
            placeholder="Describe a specific project they worked on and their role in it"
          />
          {errors.keyProject && <p className="text-red-500 text-xs mt-1">{errors.keyProject.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Achievement Metrics</label>
            <textarea
              {...register('achievementMetrics')}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-14 text-black text-sm"
              placeholder="Quantifiable results (e.g., 'Improved system performance by 40%')"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Challenge Overcome</label>
            <textarea
              {...register('challengeOvercome')}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-14 text-black text-sm"
              placeholder="A difficult situation they successfully handled"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Unique Contribution</label>
          <textarea
            {...register('uniqueContribution')}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-14 text-black text-sm"
            placeholder="What makes them stand out from others?"
          />
        </div>
      </div>

      {/* Section 7: Overall Assessment */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-slate-800 border-b-2 pb-1">Overall Assessment</h3>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Comparison to Peers *</label>
          <select
            {...register('comparisonToPeers', { required: 'Comparison to peers is required' })}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black text-sm"
          >
            <option value="">Select comparison</option>
            <option value="Outstanding">Outstanding - among the best I've encountered</option>
            <option value="Excellent">Excellent - significantly above average</option>
            <option value="Very Good">Very good - above average performer</option>
            <option value="Good">Good - solid performer</option>
            <option value="Top 10%">Among the top 10% of peers</option>
            <option value="Top 5%">Among the top 5% of peers</option>
          </select>
          {errors.comparisonToPeers && <p className="text-red-500 text-xs mt-1">{errors.comparisonToPeers.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Overall Assessment</label>
          <textarea
            {...register('overallAssessment')}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-16 text-black text-sm"
            placeholder="Your overall impression and confidence in their abilities"
          />
        </div>
      </div>

      {/* Section 8: Your Information */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-slate-800 border-b-2 pb-1">Your Information (Referrer)</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Your Full Name *</label>
            <input
              {...register('referrerName', { required: 'Your name is required' })}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black text-sm"
              placeholder="Your full name"
            />
            {errors.referrerName && <p className="text-red-500 text-xs mt-1">{errors.referrerName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Your Title/Position *</label>
            <input
              {...register('referrerTitle', { required: 'Your title is required' })}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black text-sm"
              placeholder="e.g., Professor, Senior Software Engineer"
            />
            {errors.referrerTitle && <p className="text-red-500 text-xs mt-1">{errors.referrerTitle.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Your Institution *</label>
            <input
              {...register('referrerInstitution', { required: 'Your institution is required' })}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black text-sm"
              placeholder="Your organization"
            />
            {errors.referrerInstitution && <p className="text-red-500 text-xs mt-1">{errors.referrerInstitution.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Department (Optional)</label>
            <input
              {...register('referrerDepartment')}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black text-sm"
              placeholder="e.g., Computer Science, Engineering"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Your Email *</label>
            <input
              {...register('referrerEmail', { required: 'Your email is required' })}
              type="email"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black text-sm"
              placeholder="your.email@university.edu"
            />
            {errors.referrerEmail && <p className="text-red-500 text-xs mt-1">{errors.referrerEmail.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Your Phone (Optional)</label>
            <input
              {...register('referrerPhone')}
              type="tel"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black text-sm"
              placeholder="(555) 123-4567"
            />
          </div>
        </div>
      </div>

      {/* Section 9: Letter Preferences */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-slate-800 border-b-2 pb-1">Letter Style & Preferences</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tone</label>
            <select
              {...register('tone')}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black text-sm"
            >
              <option value="Professional">Professional</option>
              <option value="Formal">Formal</option>
              <option value="Enthusiastic">Enthusiastic</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Recommendation Strength *</label>
            <select
              {...register('recommendationStrength', { required: 'Recommendation strength is required' })}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black text-sm"
            >
              <option value="Strongly Recommend">Strongly Recommend</option>
              <option value="Recommend with Enthusiasm">Recommend with Enthusiasm</option>
              <option value="Recommend">Recommend</option>
              <option value="Recommend with Reservations">Recommend with Reservations</option>
            </select>
            {errors.recommendationStrength && <p className="text-red-500 text-xs mt-1">{errors.recommendationStrength.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Letter Focus</label>
            <select
              {...register('letterFocus')}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black text-sm"
            >
              <option value="Balanced">Balanced (Academic & Personal)</option>
              <option value="Academic">Academic Focus</option>
              <option value="Professional">Professional Focus</option>
              <option value="Leadership">Leadership Focus</option>
              <option value="Technical">Technical Skills Focus</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 px-6 rounded-md transition-colors flex items-center text-sm"
        >
          {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {loading ? 'Generating...' : 'Generate Letter'}
        </button>
      </div>
    </form>
  );
}