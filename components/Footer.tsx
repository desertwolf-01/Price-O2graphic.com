import React from 'react';
import VisitorCounter from './VisitorCounter';
import { translations } from '../i18n';

interface FooterProps {
  language: 'ar' | 'en';
}

const FacebookIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
);

const InstagramIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 0C9.58 0 9.22.01 8.05.058c-1.17.055-2.205.242-3.163.58a6.9 6.9 0 00-2.4 1.557 6.9 6.9 0 00-1.557 2.4c-.338.958-.525 1.993-.58 3.163C.01 9.22 0 9.58 0 12s.01 2.78.058 3.95c.055 1.17.242 2.205.58 3.163a6.9 6.9 0 001.557 2.4 6.9 6.9 0 002.4 1.557c.958.338 1.993.525 3.163.58C9.22 23.99 9.58 24 12 24s2.78-.01 3.95-.058c1.17-.055 2.205-.242 3.163-.58a6.9 6.9 0 002.4-1.557 6.9 6.9 0 001.557-2.4c.338-.958.525-1.993.58-3.163.048-1.17.058-1.52.058-3.95s-.01-2.78-.058-3.95c-.055-1.17-.242-2.205-.58-3.163a6.9 6.9 0 00-1.557-2.4A6.9 6.9 0 0018.913.638c-.958-.338-1.993-.525-3.163-.58C14.78.01 14.42 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" clipRule="evenodd" />
    </svg>
);

const LinkedInIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);


const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language];

  return (
    <footer className="bg-white border-t border-slate-200 print:hidden">
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
        <div className={`flex flex-col md:flex-row items-center gap-4 ${language === 'ar' ? 'md:flex-row-reverse' : ''}`}>
           <p className="order-2 sm:order-1">&copy; {new Date().getFullYear()} O2Graphic. All rights reserved.</p>
           <VisitorCounter t={t} language={language} />
        </div>
        
        <div className="flex items-center gap-x-6">
            <a href="https://www.facebook.com/o2graphic" target="_blank" rel="noopener noreferrer" aria-label="O2Graphic on Facebook" className="hover:text-blue-600 transition-colors">
                <FacebookIcon />
            </a>
            <a href="https://www.instagram.com/o2graphic" target="_blank" rel="noopener noreferrer" aria-label="O2Graphic on Instagram" className="hover:text-pink-500 transition-colors">
                <InstagramIcon />
            </a>
            <a href="https://www.linkedin.com/company/o2graphic" target="_blank" rel="noopener noreferrer" aria-label="O2Graphic on LinkedIn" className="hover:text-blue-700 transition-colors">
                <LinkedInIcon />
            </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
