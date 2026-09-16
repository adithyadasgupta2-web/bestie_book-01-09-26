export interface BirthdayConfig {
  websiteTitle: string;
  bestieName: string;
  bestieNickname: string;
  birthdayDate: string; // ISO format or YYYY-MM-DD format (e.g., '2026-09-05T00:00:00')
  photos: {
    photo1: string;
    photo2: string;
    photo3: string;
    photo4: string;
  };
  music: {
    title: string;
    artist: string;
    path: string;
  };
  customMessages?: {
    coverSubtitle?: string;
    welcomeMessage?: string;
    endingMessage?: string;
  };
}

export const BIRTHDAY_CONFIG: BirthdayConfig = {
  websiteTitle: "Happy Birthday, spidey! 🎂💖",
  bestieName: "spidey",
  bestieNickname: "My Favorite person",
  // Default to today / upcoming birthday celebration. You can change this date!
  // If the date has passed or is today, the countdown triggers the celebration immediately!
  birthdayDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString().split('T')[0] + "T00:00:00",
  photos: {
    photo1: "/assets/images/photo1.jpg",
    photo2: "/assets/images/photo2.jpg",
    photo3: "/assets/images/photo3.jpg",
    photo4: "/assets/images/photo4.jpg",
  },
  music: {
    title: "Happy Birthday Acoustic & Lofi Vibes",
    artist: "With Love For You ✨",
    path: "/assets/music/song.mp3",
  },
};
