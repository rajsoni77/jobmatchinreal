import { Job, Profile, User } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    profileCompleted: true,
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane@example.com',
    profileCompleted: false,
  },
];

// Mock Profiles
export const mockProfiles: Profile[] = [
  {
    userId: '1',
    name: 'Test User',
    location: 'San Francisco, CA',
    yearsOfExperience: 3,
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Tailwind CSS'],
    preferredJobType: 'remote',
    bio: 'Full-stack developer with 3 years of experience building web applications.',
  },
];

// Mock Jobs
export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    description: 'We are looking for a Frontend Developer to join our team and help build modern web applications.',
    requirements: [
      'Proficiency in JavaScript and React',
      'Experience with modern CSS frameworks',
      'Good understanding of responsive design',
    ],
    skills: ['JavaScript', 'React', 'HTML', 'CSS', 'Tailwind'],
    jobType: 'remote',
    salary: '$90,000 - $120,000',
    postedDate: '2023-05-15',
  },
  {
    id: '2',
    title: 'Backend Developer',
    company: 'ServerSolutions',
    location: 'New York, NY',
    description: 'Join our backend team to develop scalable and efficient server-side applications.',
    requirements: [
      'Strong knowledge of Node.js or Python',
      'Experience with databases (SQL and NoSQL)',
      'Understanding of RESTful APIs',
    ],
    skills: ['Node.js', 'Express', 'MongoDB', 'REST API', 'PostgreSQL'],
    jobType: 'hybrid',
    salary: '$100,000 - $130,000',
    postedDate: '2023-05-10',
  },
  {
    id: '3',
    title: 'Full Stack Developer',
    company: 'WebWizards',
    location: 'Remote',
    description: 'Looking for a versatile developer who can work on both frontend and backend technologies.',
    requirements: [
      'Experience with JavaScript, React, and Node.js',
      'Knowledge of databases and RESTful APIs',
      'Ability to work independently',
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express'],
    jobType: 'remote',
    salary: '$110,000 - $140,000',
    postedDate: '2023-05-05',
  },
  {
    id: '4',
    title: 'UI/UX Designer',
    company: 'DesignMasters',
    location: 'Los Angeles, CA',
    description: 'Join our creative team to design beautiful and intuitive user interfaces.',
    requirements: [
      'Strong portfolio showcasing UI/UX design skills',
      'Proficiency in design tools like Figma or Sketch',
      'Understanding of user-centered design principles',
    ],
    skills: ['UI Design', 'UX Design', 'Figma', 'Sketch', 'User Research'],
    jobType: 'onsite',
    salary: '$85,000 - $110,000',
    postedDate: '2023-05-01',
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'CloudNine',
    location: 'Seattle, WA',
    description: 'We need a DevOps engineer to help automate our deployment processes and manage our cloud infrastructure.',
    requirements: [
      'Experience with AWS or Azure',
      'Knowledge of containerization (Docker, Kubernetes)',
      'CI/CD pipeline setup and management',
    ],
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'],
    jobType: 'hybrid',
    salary: '$120,000 - $150,000',
    postedDate: '2023-04-28',
  },
  {
    id: '6',
    title: 'Data Scientist',
    company: 'DataMinds',
    location: 'Boston, MA',
    description: 'Join our data science team to extract insights from complex datasets and build predictive models.',
    requirements: [
      'Strong background in statistics and machine learning',
      'Experience with Python and data science libraries',
      'Ability to communicate technical concepts to non-technical stakeholders',
    ],
    skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization', 'Statistics'],
    jobType: 'onsite',
    salary: '$115,000 - $145,000',
    postedDate: '2023-04-25',
  },
  {
    id: '7',
    title: 'Mobile Developer (React Native)',
    company: 'AppArtisans',
    location: 'Remote',
    description: 'Develop cross-platform mobile applications using React Native for iOS and Android.',
    requirements: [
      'Experience with React Native development',
      'Understanding of mobile UI/UX principles',
      'Knowledge of mobile app deployment processes',
    ],
    skills: ['React Native', 'JavaScript', 'TypeScript', 'Mobile Development', 'Redux'],
    jobType: 'remote',
    salary: '$95,000 - $125,000',
    postedDate: '2023-04-20',
  },
];

// List of skills for form selection
export const skillsList = [
  'JavaScript', 'TypeScript', 'React', 'Angular', 'Vue.js',
  'Node.js', 'Express', 'Python', 'Django', 'Flask',
  'Ruby', 'Ruby on Rails', 'PHP', 'Laravel', 'Java',
  'Spring Boot', 'C#', '.NET', 'HTML', 'CSS',
  'Sass/SCSS', 'Tailwind CSS', 'Bootstrap', 'Material UI',
  'GraphQL', 'REST API', 'SQL', 'PostgreSQL', 'MySQL',
  'MongoDB', 'Redis', 'Firebase', 'AWS', 'Azure',
  'Google Cloud', 'Docker', 'Kubernetes', 'CI/CD',
  'Git', 'GitHub', 'Agile', 'Scrum', 'TDD',
  'React Native', 'Flutter', 'iOS', 'Android', 'Swift',
  'Kotlin', 'UI Design', 'UX Design', 'Figma', 'Sketch',
  'Adobe XD', 'Linux', 'DevOps', 'Machine Learning',
  'Data Science', 'Big Data', 'Blockchain'
];