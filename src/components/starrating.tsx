import React, { useState } from 'react';

interface StarRatingProps {
  initialRating?: number;
  onChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ initialRating = 0, onChange }) => {
  const [rating, setRating] = useState(initialRating);

  const handleStarClick = (clickedRating: number) => {
    setRating(clickedRating);
    onChange(clickedRating);
  };

  return (
    <div className="flex justify-start items-center">
      <div className="flex items-center mt-2 mb-4">
        {[1, 2, 3, 4, 5].map((index) => (
          <svg
            key={index}
            onClick={() => handleStarClick(index)}
            className={`mx-1 w-4 h-4 cursor-pointer ${
              index <= rating ? 'fill-current text-yellow-500' : 'fill-current text-gray-400'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default StarRating;
