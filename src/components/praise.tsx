import React, { useState } from 'react';

interface PraiseProps {
  words: string[];
  onChange: (selectedWord: string) => void;
}

const Praise: React.FC<PraiseProps> = ({ words, onChange }) => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  const handleWordClick = (word: string) => {
    setSelectedWord(word);
    onChange(word);
  };

  return (
    <div className="flex">
      {words.map((word, index) => (
        <button
          key={index}
          className={`p-2 border mr-2 rounded-full text-lg ${word === selectedWord ? 'bg-green-400 text-white' : ''}`}
          onClick={() => handleWordClick(word)}
        >
          {word}
        </button>
      ))}
    </div>
  );
};

export default Praise;
