import { AssetItem } from './types';

export const assetsData: AssetItem[] = [
  {
    id: 1,
    title: 'Frameworks',
    icon: 'frameworks',
    description: 'Proprietary models for consulting and coaching engagements.',
    children: [
      {
        title: 'Consulting',
        details: ['PPTG', 'COACHING - 4 PILLARS', 'Z FRAMEWORK', 'Giant'],
      },
      {
        title: 'Coaching',
        details: ['Motivations Factor', 'Greenspire', 'Mcode'],
      },
    ],
  },
  {
    id: 2,
    title: 'Media',
    icon: 'media',
    description: 'Our presence and contributions in leading publications and forums.',
    details: [
        'E.T 2012', 
        'Ted X', 
        'IIM B Courses', 
        'Outlook', 
        'Guest Lectures',
        { text: 'Venturebean Consulting on Economic Times', link: 'https://economictimes.indiatimes.com/' }
    ],
  },
  {
    id: 3,
    title: 'Collaborations',
    icon: 'collaborations',
    description: 'Key partnerships that enhance our service delivery and reach.',
    details: ['Zoho', 'Zyxware', 'Insight Consultants'],
  },
  {
    id: 4,
    title: 'Assessments',
    icon: 'assessments',
    description: 'Self-assessment tools to foster growth and self-awareness.',
    details: [
      'How coachable am I?',
      'What is my leadership style?',
      'How well do I manage my time and priorities?',
      'What are my core motivators and drivers?',
      'Am I leading or managing?',
    ],
  },
  {
    id: 5,
    title: 'Industry Reports',
    icon: 'reports',
    description: 'In-depth analysis and summaries from leading consulting firms.',
    details: ['Red Seer Consulting', 'PwC', 'McKinsey', 'Format: Summary and Venture Bean\'s Take'],
  },
];
