import React from 'react';
import { fullLogoBase64 } from '../assets/logo';

const PrintHeader: React.FC = () => {
  return (
    <div className="hidden print:block p-8">
      <img src={fullLogoBase64} alt="O2Graphic Logo" className="h-16 mx-auto" />
    </div>
  );
};

export default PrintHeader;
