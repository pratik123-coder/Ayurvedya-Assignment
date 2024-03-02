import React, { ReactNode, useState } from 'react';
import StarRating from './starrating';
import ThumbsRating from './thumbsrating';
import Praise from './praise';
import { toast } from "sonner";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [safetyRating, setSafetyRating] = useState<number>(0);
  const [communicationRating, setCommunicationRating] = useState<number>(0);
  const [recommendRating, setRecommendRating] = useState<number>(0);
  const [selectedPraise, setSelectedPraise] = useState<string | null>(null);

  const handleSafetyRatingChange = (rating: number) => {
    setSafetyRating(rating);
  };

  const handleCommunicationRatingChange = (rating: number) => {
    setCommunicationRating(rating);
  };

  const handleRecommendRatingChange = (rating: number) => {
    setRecommendRating(rating);
  };

  const handlePraiseChange = (word: string) => {
    setSelectedPraise(word === selectedPraise ? null : word);
  };

  const handleSubmit = async () => {
    try {
      const values = {
        safetyRating,
        communicationRating,
        recommendRating,
        selectedPraise,
      };

      const res = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Unknown error occurred");
    }
  };

  if (!isOpen) return null;
  const words = ['Adventerous', 'Clean','Good Listener'];

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="absolute w-full h-full bg-gray-800 opacity-50" onClick={onClose}></div>
      <div className="bg-white p-8 z-10 rounded-3xl max-w-md w-full mx-auto">
        <button className="absolute top-4 right-4 text-gray-500" onClick={onClose}>
          X
        </button>
        <div className='text-black text-bold text-2xl md:text-4xl mb-4'>Leave a Review</div>
        <div className='mt-4 text-black text-lg'>
          <div className='mb-2'>Safety</div>
          <div className='text-slate-500 text-sm'>How safe did you feel?</div>
          <StarRating onChange={handleSafetyRatingChange} />
        </div>
        <div className='mt-4 text-black text-lg'>
          <div className='mb-2'>Communication</div>
          <div className='text-slate-500 text-sm'>How good was your communication?</div>
          <StarRating onChange={handleCommunicationRatingChange} />
        </div>
        <div className='mt-4 text-black text-lg'>
          <div className='mb-2'>Would you recommend Traussi to Others?</div>
          <div className='text-slate-500 text-sm'>Either rate good or bad</div>
          <div className='mt-2'><ThumbsRating onChange={handleRecommendRatingChange} /></div>
        </div>
        <div className='mt-4 text-black text-lg'>
          <div className='mb-2'>Praise</div>
          <div className='text-slate-500 text-sm'>Select any one of them</div>
          <div className='mt-2'><Praise words={words} onChange={handlePraiseChange} /></div>
        </div>
        <div className='flex items-center justify-center mt-6'>
          <button className="px-4 py-2 bg-sky-600 border border-sky-600 text-white rounded-lg hover:bg-sky-700"
            onClick={handleSubmit}>
            <i className="fa-solid fa-arrow-right-to-bracket"></i> Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;