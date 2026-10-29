/**
 * ====================================================================
 * 🎂 BIRTHDAY WEBSITE CONFIGURATION
 * ====================================================================
 * 
 * Customize this file to personalize the entire website!
 * 
 * 📸 To add your photos:
 * 1. Place your pictures inside the "public/images/" folder
 * 2. Name them photo1.jpg, photo2.jpg, etc. (or update the URLs below)
 * 
 * 🔐 Secret Password:
 * Change `secretPassword` to any 4-digit code (e.g. their birthdate "1024" or "1234")
 */

export interface GalleryPhoto {
  id: number;
  url: string;
  caption: string;
  date?: string;
  rotation?: number; // tilt angle for scrapbook Polaroid
  sticker?: string;
  placeholderBg?: string; // pastel background for cute fallback card
  placeholderIllustration?: 'cafe' | 'beach' | 'laughing' | 'selfie' | 'celebrate' | 'journey';
}

export interface BirthdayConfig {
  // Personal Info
  name: string;
  nickname: string;
  birthdayDate: string;
  relationship: string;
  secretPassword: string;

  // Screen 1: Welcome Page
  welcome: {
    greeting: string;
    subGreeting: string;
    yesButtonText: string;
    noButtonText: string;
    noPlayfulResponses: string[];
  };

  // Screen 2: Password Gate
  passwordScreen: {
    title: string;
    subtitle: string;
    hintText: string;
    errorMessage: string;
    successMessage: string;
  };

  // Screen 3: Big Birthday Reveal
  revealScreen: {
    heading: string;
    subheading: string;
    cakeGreeting: string;
    buttonText: string;
    tagline: string;
  };

  // Screen 4: Interactive Surprise Menu
  surpriseMenu: {
    heading: string;
    subtitle: string;
    progressText: string;
    items: {
      camera: { title: string; subtitle: string; badge: string };
      letter: { title: string; subtitle: string; badge: string };
      gift: { title: string; subtitle: string; badge: string };
      reasons?: { title: string; subtitle: string; badge: string };
      wish?: { title: string; subtitle: string; badge: string };
    };
    finishButtonText: string;
  };

  // Surprise A: Photo Gallery
  gallery: {
    title: string;
    subtitle: string;
    photos: GalleryPhoto[];
  };

  // Surprise B: Friendship Letter
  letter: {
    title: string;
    subtitle: string;
    salutation: string;
    paragraphs: string[];
    signOff: string;
    sender: string;
  };

  // Surprise C: Gift Box
  giftBox: {
    title: string;
    subtitle: string;
    revealedHeading: string;
    message: string;
    perks: string[];
    openAgainText: string;
  };

  // Optional Music config (preserved for future use)
  music: {
    songTitle: string;
    artist: string;
    audioSrc: string;
    musicBoxTitle: string;
  };

  // Final Wish Screen ("One Last Wish for You" ending sequence)
  finalScreen: {
    heading: string;
    pauseText: string;
    pauseButtonText: string;
    letterParagraphs: string[];
    signature: string;
    finalPhoto: {
      url: string;
      alt?: string;
      caption: string;
    };
    finalMessage: string;
    replayButtonText: string;
    footerText: string;
    message?: string;
    wishes?: string[];
  };
}

export const birthdayConfig: BirthdayConfig = {
  // 🌸 1. PERSONAL INFORMATION
  name: "Humaira Jahan Hamida",
  nickname: "Humo",
  birthdayDate: "13 Nov",
  relationship: "My Precious Person",

  // 🔐 4-Digit Password Gate
  secretPassword: "1311",

  // 🐶 2. WELCOME SCREEN
  welcome: {
    greeting: "Hey Humo!! 🎀",
    subGreeting: "I made something special for you... wanna see it? 🥹💗",
    yesButtonText: "YES PLEASE!! 💗",
    noButtonText: "NOPE 🙈",
    noPlayfulResponses: [
      "Excuse me?! I made this just for you Humo 😭💕",
      "Hey! That's illegal! Press YES 🥺🎀",
      "You know you're curious... click YES! 😜✨",
      "Don't do this to me! Look how cute this is 🥹💖",
      "There is literally no other choice! Click YES! 🌸",
    ],
  },

  // 🔐 3. SECRET PASSWORD SCREEN
  passwordScreen: {
    title: "Psst... this is a little secret 🤫",
    subtitle: "Enter your secret code, Humo!",
    hintText: "✨ Hint: Your special day (13/11) ♡",
    errorMessage: "Hmm... try your secret number again! 🥺",
    successMessage: "YAY! You unlocked it!! 🎉💖",
  },

  // 🎂 4. BIG BIRTHDAY REVEAL
  revealScreen: {
    heading: "HAPPIEST BIRTHDAYYYYY HUMO!! 🎂💗",
    subheading: "To my precious person, Hamida ✨",
    cakeGreeting: "Make a wish! 🕯️✨",
    buttonText: "OPEN YOUR SURPRISES 💌",
    tagline: "Celebrating another year of your kindness, laughs, and pure magic 🌸",
  },

  // 💌 5. SURPRISE MENU
  surpriseMenu: {
    heading: "Okay, your little surprises are waiting! 🌸",
    subtitle: "Tap each one to open 💗",
    progressText: "Surprises opened",
    items: {
      camera: {
        title: "Photo Gallery",
        subtitle: "Our favorite Roblox moments & sweet memories together 📸",
        badge: "Moments",
      },
      letter: {
        title: "A Small Letter for You",
        subtitle: "Heartfelt, honest & straight from Sami 💌",
        badge: "Open Me",
      },
      gift: {
        title: "A Special Gift Box",
        subtitle: "A blooming surprise & delicate gifts just for you 🎁",
        badge: "Surprise!",
      },
      reasons: {
        title: "6 Reasons I Love You",
        subtitle: "Plus 1 little secret thing I hate the most ♡",
        badge: "Confession ♡",
      },
      wish: {
        title: "Make a Birthday Wish",
        subtitle: "A tradition we can't skip: blow your candle! 🕯️✨",
        badge: "Wish Time 🎂",
      },
    },
    finishButtonText: "SEE FINAL WISH ✨",
  },

  // 📸 6. PHOTO GALLERY
  gallery: {
    title: "Memories in Pictures 🌸",
    subtitle: "Our cute Roblox adventures! ✨ (P.S. Sorry I couldn't upload your real photos because you haven't given them to me yet! So our cute in-game moments shine here instead 🤭🌸)",
    photos: [
      {
        id: 1,
        url: "/images/photo1.jpg",
        caption: "Matching aesthetics & posing together in Roblox! ✨",
        date: "@SAMIABU7777 & @Hamida2315 ♡",
        rotation: -2,
        sticker: "🌸",
        placeholderBg: "#FCE7F3",
        placeholderIllustration: "selfie",
      },
      {
        id: 2,
        url: "/images/photo2.jpg",
        caption: "Dancer queen with her crown on! 👑✨",
        date: "1049 minutes together & counting ♡",
        rotation: 2,
        sticker: "🌼",
        placeholderBg: "#FEF9C3",
        placeholderIllustration: "celebrate",
      },
      {
        id: 3,
        url: "/images/photo3.jpg",
        caption: "Best duo vibes & unforgettable moments 🌷",
        date: "Sweet memories",
        rotation: -1.5,
        sticker: "🌷",
        placeholderBg: "#E0E7FF",
        placeholderIllustration: "cafe",
      },
      {
        id: 4,
        url: "/images/photo4.jpg",
        caption: "Running through obbies & sunny game days together 🎮",
        date: "Adventures with Humo",
        rotation: 2.5,
        sticker: "💖",
        placeholderBg: "#EDE9FE",
        placeholderIllustration: "journey",
      },
      {
        id: 5,
        url: "/images/photo5.jpg",
        caption: "Syncing our moves and laughing till it hurts 😂💫",
        date: "Always fun with you",
        rotation: -2,
        sticker: "🌿",
        placeholderBg: "#FEF08A",
        placeholderIllustration: "laughing",
      },
    ],
  },

  // 💌 7. A SMALL LETTER FOR YOU
  letter: {
    title: "A Small Letter for You 💌",
    subtitle: "Heartfelt words, straight from my heart",
    salutation: "Dear Hamida, ❤️",
    paragraphs: [
      "I never thought that meeting someone in Roblox would bring someone so special into my life. But somehow, I met you, and I'm really glad I did.",
      "There's something about you that I genuinely love. It's not just the way you talk, but your mentality, your way of thinking, and the way you see life. I especially admire how religious-minded you are, because that's something I truly respect and appreciate about you.",
      "I don't know what the future holds for us, but I'm happy to have met you. I want to know you more, understand you better, and make more beautiful memories with you.",
      "I'm not perfect, and I have my own thoughts, struggles, and flaws. I hope you'll try to understand me the way I want to understand you. I hope we can be honest with each other, accept each other's imperfections, and grow together without pretending to be someone we're not.",
      "If Allah wills, I hope our connection grows into something beautiful and meaningful. I want us to understand each other, respect each other, and bring peace into each other's lives.",
      "Thank you for being the person you are, Hamida. ❤️",
    ],
    signOff: "With love,",
    sender: "Sami ♡",
  },

  // 🎁 8. GIFT BOX
  giftBox: {
    title: "A Special Gift Box 🎁",
    subtitle: "Untie the ribbon to see what's inside!",
    revealedHeading: "Handpicked with Love for You 🌸",
    message:
      "No virtual box could ever hold all the appreciation I have for you. I hope this special gift and the blooming tree bring a smile to your face today. Here is to more laughter, peace, and beautiful memories ahead, Humo. 💗",
    perks: [
      "🎮 Lifetime VIP Roblox partner (@SAMIABU7777)",
      "💬 A cute reminder to message me more often 🥺",
      "🕊️ Endless respect for your faith, mindset & goals",
      "🌸 Someone who will always support you & wish the best for you",
    ],
    openAgainText: "WRAP IT UP & OPEN AGAIN 🎀",
  },

  // 🎵 Optional Music
  music: {
    songTitle: "Special Song for Humo 🎵",
    artist: "From Sami with Love ♡",
    audioSrc: "/music/birthday-song.mp3",
    musicBoxTitle: "Dreamy Music Box - Happy Birthday Humo",
  },

  // ✨ 9. FINAL SCREEN: "ONE LAST WISH FOR YOU" ENDING SEQUENCE
  finalScreen: {
    heading: "One Last Wish for You, Humo 🌸",
    pauseText: "And if I could make one wish for you…",
    pauseButtonText: "There's something I want you to know ♡",
    letterParagraphs: [
      "I hope this year brings you the kind of happiness that stays, the kind of peace that makes everything feel lighter, and the courage to follow the dreams and goals you hold close. I hope you find little reasons to smile on ordinary days, and moments that remind you how special you are.",
      "And whenever life gets a little difficult, I hope you remember that you don't have to carry everything alone. You're allowed to grow at your own pace and begin again.",
      "More than anything, I hope you always find reasons to be proud of who you are. You deserve beautiful things, genuine happiness, and a heart full of peace.",
      "Happy Birthday, Humo. I'm really glad our paths crossed. ♡",
    ],
    signature: "With love always, Sami ♡",
    finalPhoto: {
      url: "/images/final-memory.jpg",
      alt: "Sami and Hamida in Roblox",
      caption: "To many more sweet moments together ♡",
    },
    finalMessage: "Happy Birthday, Hamida. No matter what the future holds, I'm grateful to have met you. ♡",
    replayButtonText: "Replay the surprise ↺",
    footerText: "Made with love by Sami, just for you 🌸",
    message:
      "May this new chapter bring you beautiful memories, peaceful days, exciting adventures, and all the happiness you deserve.",
    wishes: [
      "May your days be filled with warmth, quiet peace & sunshine 🌸",
      "May every dream and goal you hold close find its way to you 🕊️",
      "May you always remember how deeply appreciated you are ✨",
    ],
  },
};
