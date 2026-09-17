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
  birthdayDate: "2026-11-12",
  photos: {
    photo1: "/assets/photos/photo1.jpg",
    photo2: "/assets/photos/photo2.jpg",
    photo3: "/assets/photos/photo3.jpg",
    photo4: "/assets/photos/photo4.jpg",
  },
  music: {
    title: "Happy Birthday Acoustic & Lofi Vibes",
    artist: "With Love For You ✨",
    path: "/assets/music/song.mp3",
  },
};
