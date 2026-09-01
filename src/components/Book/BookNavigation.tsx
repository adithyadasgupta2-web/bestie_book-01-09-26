import React from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Sparkles, ListOrdered } from 'lucide-react';

interface BookNavigationProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onSelectPage: (page: number) => void;
  pageTitles: string[];
}

export const BookNavigation: React.FC<BookNavigationProps> = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  onSelectPage,
  pageTitles,
}) => {
  const [showToc, setShowToc] = React.useState(false);

  const handlePrev = () => {
    if (currentPage > 0) {
      onPrevPage();
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      onNextPage();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-4 px-3 flex flex-col items-center gap-2 select-none z-30">
      {/* Navigation Controls Bar */}
      <div className="flex items-center justify-between w-full max-w-md bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-pink-500/30 shadow-xl">
        {/* Previous Button */}
        <button
          id="prev-page-button"
          onClick={handlePrev}
          disabled={currentPage === 0}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
            currentPage === 0
              ? 'opacity-40 cursor-not-allowed text-slate-500'
              : 'text-pink-200 hover:text-white hover:bg-pink-600/40 active:scale-95 cursor-pointer'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Center Page Selector & TOC Trigger */}
        <div className="flex items-center gap-2">
          <button
            id="open-toc-button"
            onClick={() => setShowToc(!showToc)}
            className="flex items-center gap-1.5 px-3 py-1 bg-pink-500/20 hover:bg-pink-500/30 text-pink-200 border border-pink-500/40 rounded-full text-xs font-semibold transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-pink-400" />
            <span>
              {currentPage === 0 ? 'Cover' : `Page ${currentPage} / ${totalPages - 1}`}
            </span>
          </button>
        </div>

        {/* Next Button */}
        <button
          id="next-page-button"
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
            currentPage === totalPages - 1
              ? 'opacity-40 cursor-not-allowed text-slate-500'
              : 'text-pink-200 hover:text-white hover:bg-pink-600/40 active:scale-95 cursor-pointer'
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Dots / Bar */}
      <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1 max-w-full">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            id={`jump-to-page-${idx}`}
            onClick={() => {
              onSelectPage(idx);
            }}
            title={pageTitles[idx] || `Page ${idx}`}
            className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
              currentPage === idx
                ? 'w-6 bg-gradient-to-r from-pink-400 to-rose-500 shadow-[0_0_8px_rgba(244,114,182,0.8)]'
                : 'w-2 bg-pink-300/30 hover:bg-pink-300/60'
            }`}
          />
        ))}
      </div>

      {/* Table of Contents Modal */}
      {showToc && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowToc(false)}
        >
          <div
            className="bg-slate-900 border border-pink-500/40 rounded-2xl max-w-md w-full p-5 max-h-[80vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-pink-500/20 mb-3">
              <h3 className="font-playfair text-lg font-bold text-pink-200 flex items-center gap-2">
                <ListOrdered className="w-4 h-4 text-pink-400" />
                <span>Storybook Chapters</span>
              </h3>
              <button
                id="close-toc-button"
                onClick={() => setShowToc(false)}
                className="text-xs text-slate-400 hover:text-white px-2 py-1 bg-slate-800 rounded-full"
              >
                Close
              </button>
            </div>

            <div className="overflow-y-auto space-y-1.5 pr-1 custom-book-scrollbar flex-1">
              {pageTitles.map((title, idx) => (
                <button
                  key={idx}
                  id={`toc-item-${idx}`}
                  onClick={() => {
                    onSelectPage(idx);
                    setShowToc(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                    currentPage === idx
                      ? 'bg-pink-500 text-white shadow-md'
                      : 'text-slate-300 hover:bg-pink-500/20 hover:text-pink-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="font-mono text-[10px] opacity-70 w-5">
                      {idx === 0 ? 'COV' : String(idx).padStart(2, '0')}
                    </span>
                    <span className="truncate">{title}</span>
                  </div>
                  {currentPage === idx && <Sparkles className="w-3.5 h-3.5 text-yellow-300" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
