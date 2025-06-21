import easyImg from '../../../assets/images/easyLevelIcon.png';
import mediumImg from '../../../assets/images/mediumLevelIcon.png';
import hardImg from '../../../assets/images/hardLevelIcon.png';

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
      bgColor: 'bg-rose-600',
    },
    public: {
      type: 'PUBLIC',
      bgColor: 'bg-green-400',
    },
  };
  