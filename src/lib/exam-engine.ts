export interface ExamConfig {
  id: string;
  title: string;
  examType: 'Chapter Test' | 'Model Test' | 'Practice Quiz' | 'Mock Exam' | 'Live Exam';
  duration: number; // minutes
  totalMarks: number;
  passMarks: number;
  negativeMarking?: boolean;
  negativeValue?: number;
  attemptLimit: number;
  questionRandomization: boolean;
  optionShuffle: boolean;
  scheduledStart?: Date;
  scheduledEnd?: Date;
  resultVisibility: 'immediate' | 'after_close' | 'after_review' | 'hidden';
  published: boolean;
}

export const examResults = new Map(); // dev in-memory store; production uses DB
