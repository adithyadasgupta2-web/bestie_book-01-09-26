import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { HelpCircle, Check, Sparkles, RefreshCw, Trophy, Heart } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/assets';
import { soundEngine } from '../utils/audio';

export const QuizPage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = [
    {
      id: 1,
      question: 'Who is officially more dramatic when minor chaos strikes? 🎭',
      options: [
        { text: `${BIRTHDAY_CONFIG.bestieName} (without question!)`, emoji: '👑', comment: 'Correct! Ready for the Broadway stage.' },
        { text: 'Both of us equally in stereo mode', emoji: '👯‍♀️', comment: 'An unstoppable acoustic theatrical duo!' },
        { text: 'Neither, we are calm zen masters (Lies!)', emoji: '🧘‍♀️', comment: 'Who wrote this lie?! 😂' },
      ],
    },
    {
      id: 2,
      question: 'Who starts laughing first at the most inappropriate times? 🤣',
      options: [
        { text: 'One glance and we both burst into tears of laughter', emoji: '👀', comment: 'Eye contact is our biggest danger zone.' },
        { text: `${BIRTHDAY_CONFIG.bestieName}, then snorts`, emoji: '🐽', comment: 'The iconic snort-laugh never fails!' },
        { text: 'Whoever makes the accidental squeak sound', emoji: '🎤', comment: '100% facts!' },
      ],
    },
    {
      id: 3,
      question: 'Who is always hungry 15 minutes after eating a full meal? 🍕',
      options: [
        { text: 'Is there even a question? BOTH OF US!', emoji: '🍟', comment: 'Snack supremacy forever!' },
        { text: `${BIRTHDAY_CONFIG.bestieName} claiming "I just need a tiny bite"`, emoji: '🍰', comment: 'Proceeds to eat half the dessert! 😂' },
        { text: 'Our stomachs operate on an infinite snack loop', emoji: '♾️', comment: 'Scientifically proven friendship trait.' },
      ],
    },
    {
      id: 4,
      question: 'Who takes 400 photos just to choose the 1 perfect shot? 📸',
      options: [
        { text: 'The master photographer bestie!', emoji: '🤳', comment: 'Lighting! Angles! Poses! Perfection!' },
        { text: 'We take 399 blurry laughing photos and 1 good one', emoji: '✨', comment: 'The blurry ones are the best memories anyway.' },
      ],
    },
    {
      id: 5,
      question: 'Who is the crazier one in this friendship? 🤪',
      options: [
        { text: 'A matched pair of unstoppable wild souls', emoji: '💥', comment: 'Chaos frequency: 1000/10!' },
        { text: `${BIRTHDAY_CONFIG.bestieName} leads, I gladly follow`, emoji: '🚀', comment: 'The ultimate adventure captain!' },
      ],
    },
  ];

  const handleSelectOption = (qIdx: number, oIdx: number) => {
    soundEngine.playSparkle();
    const updated = { ...selectedAnswers, [qIdx]: oIdx };
    setSelectedAnswers(updated);

    if (qIdx < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(qIdx + 1);
      }, 350);
    } else {
      setTimeout(() => {
        setIsCompleted(true);
        soundEngine.playTrophyFanfare();
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f43f5e', '#ec4899', '#a855f7', '#fbbf24'],
        });
      }, 400);
    }
  };

  const handleRestart = () => {
    soundEngine.playSparkle();
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
  };

  const currentQ = questions[currentQuestionIndex];

  return (
    <div className="h-full flex flex-col justify-between p-3 sm:p-5 relative overflow-hidden bg-gradient-to-b from-[#fffafd] via-[#fbf2f7] to-[#f7eeff]">
      {/* Header */}
      <div className="text-center pt-1">
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-purple-100 border border-purple-200 rounded-full text-purple-700 text-[11px] font-semibold uppercase tracking-wider mb-1">
          <HelpCircle className="w-3 h-3 text-purple-600" />
          <span>Interactive Friendship Quiz</span>
        </div>
        <h2 className="font-playfair text-lg sm:text-2xl font-black text-slate-800 leading-tight">
          HOW WELL DO YOU KNOW US? 😏🎮
        </h2>
      </div>

      {/* Main Quiz Area */}
      <div className="my-auto max-w-md mx-auto w-full py-1">
        {!isCompleted ? (
          <div className="bg-white/85 backdrop-blur-xs p-3.5 sm:p-4 rounded-2xl border border-pink-200 shadow-md">
            {/* Progress indicator */}
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-2">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span className="text-pink-600 font-sans">{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-pink-100 h-1.5 rounded-full overflow-hidden mb-3">
              <div
                className="bg-gradient-to-r from-pink-500 to-purple-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <h3 className="font-playfair text-sm sm:text-base font-bold text-slate-800 mb-3 min-h-[40px] flex items-center">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-2">
              {currentQ.options.map((opt, oIdx) => {
                const isSelected = selectedAnswers[currentQuestionIndex] === oIdx;
                return (
                  <button
                    key={oIdx}
                    id={`quiz-q${currentQuestionIndex}-opt${oIdx}`}
                    onClick={() => handleSelectOption(currentQuestionIndex, oIdx)}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-rose-50 border-rose-400 text-rose-900 shadow-xs'
                        : 'bg-white hover:bg-pink-50/70 border-slate-200 hover:border-pink-300 text-slate-700'
                    }`}
                  >
                    <span className="text-lg flex-shrink-0">{opt.emoji}</span>
                    <span className="font-caveat text-base sm:text-lg font-semibold leading-tight flex-1">
                      {opt.text}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-rose-600 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Completion Screen */
          <div className="bg-white/90 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border-2 border-rose-300 shadow-lg text-center animate-in zoom-in-95 duration-300">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center mb-2">
              <Trophy className="w-6 h-6 animate-bounce" />
            </div>
            <h3 className="font-playfair text-xl font-extrabold text-slate-800">
              FINAL RESULT 🎉
            </h3>
            <p className="font-caveat text-base sm:text-lg text-rose-600 font-bold mt-1">
              Congratulations! You officially know this friendship better than anyone else in the universe! 😂💖
            </p>

            <div className="my-3 p-2.5 bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-purple-500/10 rounded-xl border border-pink-200">
              <p className="font-sans text-xs uppercase font-extrabold text-slate-700 tracking-wider">
                CERTIFIED FACT:
              </p>
              <p className="font-dancing text-xl sm:text-2xl text-purple-900 font-bold mt-0.5">
                WE ARE BESTIES FOREVER! ❤️
              </p>
            </div>

            <button
              id="retake-quiz-button"
              onClick={handleRestart}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-xs font-bold transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Play Quiz Again</span>
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center pb-1">
        <span className="text-[11px] font-sans text-pink-500 font-medium flex items-center justify-center gap-1">
          <Heart className="w-3 h-3 text-rose-500 fill-rose-300" />
          <span>Score: 100% Soulmate Besties</span>
        </span>
      </div>
    </div>
  );
};
