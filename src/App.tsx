import { useState, useEffect } from 'react';
import { FloatingElements } from './components/common/FloatingElements';
import { GlobalTapStars, FloatingHearts } from './components/common/GlobalEffects';
import { GlobalMusicPlayer } from './components/common/GlobalMusicPlayer';
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { PasswordScreen } from './components/screens/PasswordScreen';
import { BirthdayRevealScreen } from './components/screens/BirthdayRevealScreen';
import { SurpriseMenuScreen, type SurpriseKey } from './components/screens/SurpriseMenuScreen';
import { PhotoGalleryModal } from './components/surprises/PhotoGalleryModal';
import { LetterEnvelopeModal } from './components/surprises/LetterEnvelopeModal';
import { GiftBoxModal } from './components/surprises/GiftBoxModal';
import { ReasonsLoveModal } from './components/surprises/ReasonsLoveModal';
import { MakeAWishModal } from './components/surprises/MakeAWishModal';
import { FinalWishScreen } from './components/screens/FinalWishScreen';

type ScreenState = 'welcome' | 'password' | 'reveal' | 'menu' | 'final';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>(() => {
    try {
      const saved = localStorage.getItem('bday_screen');
      if (saved && ['welcome', 'password', 'reveal', 'menu', 'final'].includes(saved)) {
        return saved as ScreenState;
      }
    } catch {
      // ignore
    }
    return 'welcome';
  });

  const [activeSurprise, setActiveSurprise] = useState<SurpriseKey | null>(null);

  const [openedSurprises, setOpenedSurprises] = useState<Record<SurpriseKey, boolean>>(() => {
    try {
      const saved = localStorage.getItem('bday_opened_surprises');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return {
      gallery: false,
      letter: false,
      gift: false,
      reasons: false,
      wish: false,
    };
  });

  // Save minimal state to localStorage so refresh doesn't break
  useEffect(() => {
    try {
      localStorage.setItem('bday_screen', currentScreen);
    } catch {
      // ignore
    }
  }, [currentScreen]);

  useEffect(() => {
    try {
      localStorage.setItem('bday_opened_surprises', JSON.stringify(openedSurprises));
    } catch {
      // ignore
    }
  }, [openedSurprises]);

  const handleSelectSurprise = (key: SurpriseKey) => {
    setActiveSurprise(key);
    setOpenedSurprises((prev) => ({
      ...prev,
      [key]: true,
    }));
  };

  const handleCloseSurprise = () => {
    setActiveSurprise(null);
  };

  const handleReplay = () => {
    try {
      localStorage.removeItem('bday_screen');
      localStorage.removeItem('bday_opened_surprises');
    } catch {
      // ignore
    }
    setOpenedSurprises({
      gallery: false,
      letter: false,
      gift: false,
      reasons: false,
      wish: false,
    });
    setActiveSurprise(null);
    setCurrentScreen('welcome');
  };

  return (
    <div className="relative min-h-[100svh] w-full flex flex-col items-center justify-center overflow-x-hidden font-sans">
      {/* ── Global effects: always active on every screen ── */}
      <GlobalTapStars />       {/* ✨ star burst on every tap */}
      <FloatingHearts />       {/* 💗 hearts drifting upward on all pages */}
      {/* Dreamy Ambient Floating Background Elements */}
      <FloatingElements />

      {/* Floating Background Music Player & Cassette Modal */}
      <GlobalMusicPlayer autoStartTrigger={currentScreen !== 'welcome'} />

      {/* Screen 1: Welcome Page */}
      {currentScreen === 'welcome' && (
        <WelcomeScreen onYes={() => setCurrentScreen('password')} />
      )}

      {/* Screen 2: Secret Password Keypad */}
      {currentScreen === 'password' && (
        <PasswordScreen
          onUnlock={() => setCurrentScreen('reveal')}
          onBack={() => setCurrentScreen('welcome')}
        />
      )}

      {/* Screen 3: Big Birthday Reveal */}
      {currentScreen === 'reveal' && (
        <BirthdayRevealScreen onOpenSurprises={() => setCurrentScreen('menu')} />
      )}

      {/* Screen 4: Interactive Scrapbook Surprise Menu */}
      {currentScreen === 'menu' && (
        <>
          <SurpriseMenuScreen
            onSelectSurprise={handleSelectSurprise}
            openedSurprises={openedSurprises}
            onGoToFinal={() => setCurrentScreen('final')}
          />

          {/* Surprise Modals */}
          {activeSurprise === 'gallery' && (
            <PhotoGalleryModal onClose={handleCloseSurprise} />
          )}
          {activeSurprise === 'letter' && (
            <LetterEnvelopeModal onClose={handleCloseSurprise} />
          )}
          {activeSurprise === 'reasons' && (
            <ReasonsLoveModal onClose={handleCloseSurprise} />
          )}
          {activeSurprise === 'wish' && (
            <MakeAWishModal onClose={handleCloseSurprise} />
          )}
          {activeSurprise === 'gift' && (
            <GiftBoxModal onClose={handleCloseSurprise} />
          )}
        </>
      )}

      {/* Screen 5: Final Wish Screen */}
      {currentScreen === 'final' && (
        <FinalWishScreen onReplay={handleReplay} />
      )}
    </div>
  );
}

export default App;
