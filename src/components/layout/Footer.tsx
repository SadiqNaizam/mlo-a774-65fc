import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40 py-4 px-6 text-xs text-muted-foreground">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <p>&copy; {currentYear} ShopSphere Inc. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <p>Version 1.0.0</p>
          <span className="hidden sm:inline">|</span>
          <nav className="flex gap-4">
            <Link to="#" className="hover:text-primary transition-colors">
              Support
            </Link>
            <Link to="#" className="hover:text-primary transition-colors">
              Documentation
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;