import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookCover } from './BookCover';
import { BookPage } from './BookPage';
import { BookNavigation } from './BookNavigation';
import { WelcomePage } from '../../pages/WelcomePage';
import { CountdownPage } from '../../pages/CountdownPage';
import { BestieIntroPage } from '../../pages/BestieIntroPage';
import { MemoryPage1 } from '../../pages/MemoryPage1';
import { MemoryPage2 } from '../../pages/MemoryPage2';
import { MemoryPage3 } from '../../pages/MemoryPage3';
import { MemoryPage4 } from '../../pages/MemoryPage4';
import { BestieReasonsPage } from '../../pages/BestieReasonsPage';
import { AwardsPage } from '../../pages/AwardsPage';
import { QuizPage } from '../../pages/QuizPage';
import { LetterPage } from '../../pages/LetterPage';
import { WishPage } from '../../pages/WishPage';
import { MusicPage } from '../../pages/MusicPage';
import { FinalSurprisePage } from '../../pages/FinalSurprisePage';
import { EndingPage } from '../../pages/EndingPage';
import { soundEngine } from '../../utils/audio';

interface BirthdayBookProps {
  onMusicPlayStateChange?: (isPlaying: boolean) => void;
}

export const BirthdayBook: React.FC<BirthdayBookProps> = ({ onMusicPlayStateChange }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageDirection, setPageDirection] = useState<number>(1);
  const touchStartXRef = useRef<number | null>(null);

  const pageTitles = [
    'Book Cover ✨',
    'Welcome Birthday Girl 🎉',
    'Special Countdown 🎂',
    //'Who is this Legend? 😎',
    'Memory Reel #1 📸',
    'Memory Reel #2 🤪',
    'Memory Reel #3 ✨',
    'Memory Reel #4 💕',
    'Why You are My Bestie 💖',
   //'Official Bestie Awards 🏆',
    //'Friendship Quiz 🎮',
    'A Little Letter For You 💌',
    'Make a Wish & Cake 🎂',
    'Our Birthday Vibes 🎵',
    'Final Grand Surprise 🎁',
    'The End & Epilogue 📖',
  ];

  const totalPages = pageTitles.length;

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      soundEngine.playPageTurn({
        direction: 'forward',
        isCover: currentPage === 0,
      });
      setPageDirection(1);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      soundEngine.playPageTurn({
        direction: 'backward',
        isCover: currentPage === 1,
      });
      setPageDirection(-1);
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToPage = (pageIndex: number) => {
    if (pageIndex >= 0 && pageIndex < totalPages && pageIndex !== currentPage) {
      soundEngine.playPageTurn({
        direction: pageIndex > currentPage ? 'forward' : 'backward',
        isCover: currentPage === 0 || pageIndex === 0,
        multiPage: Math.abs(pageIndex - currentPage) > 1,
      });
      setPageDirection(pageIndex > currentPage ? 1 : -1);
      setCurrentPage(pageIndex);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft') {
        goToPrevPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  // Touch / Mobile Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    // Minimum swipe threshold
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        // Swiped Left -> Next Page
        goToNextPage();
      } else {
        // Swiped Right -> Prev Page
        goToPrevPage();
      }
    }
    touchStartXRef.current = null;
  };

  // Render individual page content
  const renderPageContent = (index: number) => {
    switch (index) {
      case 0:
        return <BookCover onOpenBook={goToNextPage} />;
      case 1:
        return (
          <BookPage pageNumber={1} totalPages={totalPages - 1}>
            <WelcomePage onNextPage={goToNextPage} />
          </BookPage>
        );
      case 2:
        return (
          <BookPage pageNumber={2} totalPages={totalPages - 1}>
            <CountdownPage />
          </BookPage>
        );
      /case 3:
        return (
          <BookPage pageNumber={3} totalPages={totalPages - 1}>
            <BestieIntroPage />
          </BookPage>
        );/
      case 3:
        return (
          <BookPage pageNumber={4} totalPages={totalPages - 1}>
            <MemoryPage1 />
          </BookPage>
        );
      case 4:
        return (
          <BookPage pageNumber={5} totalPages={totalPages - 1}>
            <MemoryPage2 />
          </BookPage>
        );
      case 5:
        return (
          <BookPage pageNumber={6} totalPages={totalPages - 1}>
            <MemoryPage3 />
          </BookPage>
        );
      case 6:
        return (
          <BookPage pageNumber={7} totalPages={totalPages - 1}>
            <MemoryPage4 />
          </BookPage>
        );
      case 7:
        return (
          <BookPage pageNumber={8} totalPages={totalPages - 1}>
            <BestieReasonsPage />
          </BookPage>
        );
      /case 9:
        return (
          <BookPage pageNumber={9} totalPages={totalPages - 1}>
            <AwardsPage />
          </BookPage>
        );/
      /case 10:
        return (
          <BookPage pageNumber={10} totalPages={totalPages - 1}>
            <QuizPage />
          </BookPage>
        );/
      case 8:
        return (
          <BookPage pageNumber={11} totalPages={totalPages - 1}>
            <LetterPage />
          </BookPage>
        );
      case 9:
        return (
          <BookPage pageNumber={12} totalPages={totalPages - 1}>
            <WishPage />
          </BookPage>
        );
      case 10:
        return (
          <BookPage pageNumber={13} totalPages={totalPages - 1}>
            <MusicPage onMusicPlayStateChange={onMusicPlayStateChange} />
          </BookPage>
        );
      case 11:
        return (
          <BookPage pageNumber={14} totalPages={totalPages - 1}>
            <FinalSurprisePage />
          </BookPage>
        );
      case 12:
        return (
          <BookPage pageNumber={15} totalPages={totalPages - 1}>
            <EndingPage onRestartStory={() => goToPage(0)} />
          </BookPage>
        );
      default:
        return null;
    }
  };

  // 3D Page flip motion variants
  const pageVariants = {
    initial: (dir: number) => ({
      opacity: 0,
      rotateY: dir > 0 ? 45 : -45,
      scale: 0.94,
      transformOrigin: dir > 0 ? 'left center' : 'right center',
      boxShadow: '0 30px 60px -12px rgba(0,0,0,0.5)',
    }),
    animate: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: [0.25, 1, 0.5, 1],
      },
    },
    exit: (dir: number) => ({
      opacity: 0,
      rotateY: dir > 0 ? -45 : 45,
      scale: 0.94,
      transformOrigin: dir > 0 ? 'left center' : 'right center',
      transition: {
        duration: 0.45,
        ease: [0.25, 1, 0.5, 1],
      },
    }),
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-screen p-2 sm:p-4 z-10 select-none">
      {/* 3D Storybook Wrapper */}
      <div
        className="perspective-2000 w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Realistic Book Outer Spine & Edge Elevation Container */}
        <div className="relative w-full aspect-[4/5.5] sm:aspect-[16/11] min-h-[78vh] max-h-[84vh] sm:max-h-[82vh] book-shadow rounded-2xl sm:rounded-3xl p-1.5 sm:p-2.5 bg-gradient-to-r from-pink-900 via-rose-800 to-pink-950 border-2 border-pink-400/30">
          {/* Subtle 3D Book Page Stack Edges (Right side depth) */}
          <div className="absolute right-0 top-3 bottom-3 w-3 bg-gradient-to-l from-amber-100 via-pink-100 to-white rounded-r-md opacity-80 shadow-md page-edge-effect pointer-events-none" />
          <div className="absolute bottom-0 left-4 right-4 h-2.5 bg-gradient-to-t from-black/40 to-transparent rounded-b-md pointer-events-none" />

          {/* Realistic Book Spine (Left side) */}
          <div className="absolute left-0 top-1 bottom-1 w-5 sm:w-6 bg-gradient-to-r from-black/50 via-rose-950 to-transparent rounded-l-2xl z-30 pointer-events-none" />

          {/* Animated Page Transition Viewport */}
          <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#fffefc] transform-style-preserve-3d shadow-2xl">
            <AnimatePresence custom={pageDirection} mode="wait">
              <motion.div
                key={currentPage}
                custom={pageDirection}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full h-full"
              >
                {renderPageContent(currentPage)}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Book Navigation Bar & Chapter Dots */}
      <BookNavigation
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevPage={goToPrevPage}
        onNextPage={goToNextPage}
        onSelectPage={goToPage}
        pageTitles={pageTitles}
      />
    </div>
  );
};
