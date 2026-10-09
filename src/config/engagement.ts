/**
 * Quiz questions, "Did you know?" facts and study tips for the Fun Zone.
 * Keep answers accurate: `answer` is the index of the correct option.
 */

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface QuizSet {
  id: string;
  label: string;
  questions: QuizQuestion[];
}

export const quizSets: QuizSet[] = [
  {
    id: 'classes-6-8',
    label: 'Classes 6–8',
    questions: [
      {
        question: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Mercury'],
        answer: 1,
        explanation: 'Iron oxide (rust) in its soil gives Mars its reddish colour.',
      },
      {
        question: 'How many sides does a hexagon have?',
        options: ['5', '6', '7', '8'],
        answer: 1,
        explanation: '“Hexa” means six. Honeycomb cells are a famous example of hexagons.',
      },
      {
        question: 'What is the largest organ of the human body?',
        options: ['Liver', 'Brain', 'Skin', 'Lungs'],
        answer: 2,
        explanation: 'The skin covers the whole body and protects everything inside it.',
      },
      {
        question: 'Plants make their food using sunlight. What is this process called?',
        options: ['Respiration', 'Digestion', 'Transpiration', 'Photosynthesis'],
        answer: 3,
        explanation: 'Using sunlight, plants turn carbon dioxide and water into glucose and release oxygen.',
      },
      {
        question: 'What is the value of 3/4 written as a percentage?',
        options: ['34%', '43%', '75%', '80%'],
        answer: 2,
        explanation: '3 ÷ 4 = 0.75, and 0.75 × 100 = 75%.',
      },
    ],
  },
  {
    id: 'class-9',
    label: 'Class 9',
    questions: [
      {
        question: 'What is the chemical symbol for sodium?',
        options: ['So', 'Sd', 'Na', 'S'],
        answer: 2,
        explanation: 'Na comes from “natrium”, the Latin name for sodium.',
      },
      {
        question: 'What is the SI unit of force?',
        options: ['Joule', 'Newton', 'Watt', 'Pascal'],
        answer: 1,
        explanation: 'One newton is the force that gives a 1 kg mass an acceleration of 1 m/s².',
      },
      {
        question: 'Which of these numbers is irrational?',
        options: ['√4', '0.5', '22/7', '√2'],
        answer: 3,
        explanation: '√2 cannot be written as p/q. Note that 22/7 is only an approximation of π.',
      },
      {
        question: 'Which part of the cell is called its “powerhouse”?',
        options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Cell wall'],
        answer: 1,
        explanation: 'Mitochondria release energy from food during cellular respiration.',
      },
      {
        question: 'In which medium does sound travel fastest?',
        options: ['Air', 'Water', 'Steel', 'Vacuum'],
        answer: 2,
        explanation: 'Sound travels fastest in solids. It cannot travel through a vacuum at all.',
      },
    ],
  },
  {
    id: 'class-10',
    label: 'Class 10',
    questions: [
      {
        question: 'What is the value of sin²θ + cos²θ?',
        options: ['0', '1', '2', 'tan θ'],
        answer: 1,
        explanation: 'This identity holds for every angle θ and follows from Pythagoras’ theorem.',
      },
      {
        question: 'Which lens is used to correct myopia (short-sightedness)?',
        options: ['Convex lens', 'Concave lens', 'Cylindrical lens', 'Bifocal lens'],
        answer: 1,
        explanation: 'A concave (diverging) lens moves the image back onto the retina.',
      },
      {
        question: 'What is the pH of pure water at 25 °C?',
        options: ['0', '5', '7', '14'],
        answer: 2,
        explanation: 'Pure water is neutral, so its pH is 7.',
      },
      {
        question: 'What is the discriminant of x² − 4x + 4 = 0?',
        options: ['0', '4', '8', '16'],
        answer: 0,
        explanation: 'b² − 4ac = 16 − 16 = 0, so the equation has two equal real roots (x = 2).',
      },
      {
        question: 'Which gas is released when zinc reacts with dilute hydrochloric acid?',
        options: ['Oxygen', 'Chlorine', 'Hydrogen', 'Carbon dioxide'],
        answer: 2,
        explanation: 'Zn + 2HCl → ZnCl₂ + H₂. The hydrogen gas burns with a “pop” sound.',
      },
    ],
  },
];

export const funFacts: { title: string; fact: string }[] = [
  {
    title: 'Zero came from India',
    fact: 'In 628 CE, the Indian mathematician Brahmagupta wrote down rules for calculating with zero as a number.',
  },
  {
    title: 'Aryabhata’s π',
    fact: 'Around 499 CE, Aryabhata calculated π as 3.1416, accurate to four decimal places.',
  },
  {
    title: 'Sunlight is 8 minutes old',
    fact: 'Light from the Sun takes about 8 minutes and 20 seconds to reach Earth.',
  },
  {
    title: 'Three hearts',
    fact: 'An octopus has three hearts: two pump blood to the gills and one pumps it to the rest of the body.',
  },
  {
    title: 'Bananas are berries',
    fact: 'Botanically, bananas are berries but strawberries are not.',
  },
  {
    title: 'Backwards sunrise',
    fact: 'Venus spins in the opposite direction to most planets, so on Venus the Sun rises in the west.',
  },
  {
    title: 'A hungry brain',
    fact: 'Your brain is about 2% of your body weight but uses roughly 20% of its energy.',
  },
  {
    title: 'Spacing beats cramming',
    fact: 'Revising a topic a few times over several days helps you remember it far longer than one long session.',
  },
];

export const studyTips: { title: string; tip: string }[] = [
  { title: 'Teach it back', tip: 'Explain a topic aloud as if teaching a friend. Gaps in understanding show up quickly.' },
  { title: 'Little and often', tip: 'Short daily practice sessions build skill faster than one long session a week.' },
  { title: 'Learn from mistakes', tip: 'Keep a mistakes notebook and review it before every test.' },
  { title: 'Sleep on it', tip: 'A good night’s sleep helps your brain store what you learnt during the day.' },
];
