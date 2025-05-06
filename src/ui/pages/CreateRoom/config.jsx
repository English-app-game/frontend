import easyImg from '../../../assets/images/easy-level.png';
import mediumImg from '../../../assets/images/medium-level.png';
import hardImg from '../../../assets/images/hard-level.png';

export const levelOptions = {
    easy: {
      nameLevel: 'EASY',
      img: easyImg, 
    },
    medium: {
      nameLevel: 'MEDIUM',
      img: mediumImg,
    },
    hard: {
      nameLevel: 'HARD',
      img: hardImg,
    },
  };
  
  export const statusOptions = {
    private: {
      type: 'PRIVATE',
      bgColor: 'bg-rose-400',
      borderColor: 'border-rose-600',
      hoverColor: 'hover:bg-rose-300',
      ringColor: 'ring-rose-600',
    },
    public: {
      type: 'PUBLIC',
      bgColor: 'bg-green-400',
      borderColor: 'border-green-600',
      hoverColor: 'hover:bg-green-300',
      ringColor: 'ring-green-600',
    },
  };
  