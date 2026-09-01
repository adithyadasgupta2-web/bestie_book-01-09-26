export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    emoji: string;
    isBestieAnswer?: boolean;
    funnyComment?: string;
  }[];
}

export interface BestieAward {
  id: string;
  title: string;
  icon: string;
  subtitle: string;
  congratsMessage: string;
  badgeColor: string;
}

export interface ReasonItem {
  id: number;
  emoji: string;
  text: string;
  highlight?: string;
}

export interface PhotoMemory {
  id: number;
  title: string;
  photoKey: 'photo1' | 'photo2' | 'photo3' | 'photo4';
  defaultImage: string;
  caption: string;
  tag: string;
  rotation: string;
  doodles: string[];
}
