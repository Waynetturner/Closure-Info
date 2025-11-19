import React from 'react';
import { ShieldCheck, Menu, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
  onSignOut?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, showNav = true, onSignOut }) => {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-800">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center cursor-pointer" onClick={() => window.location.reload()}>
              <ShieldCheck className="h-8 w-8 text-teal-700 mr-2" />
              <span className="text-xl font-semibold tracking-tight text-teal-900">
                Closure.info
              </span>
            </div>
            
            {showNav && (
              <div className="flex items-center space-x-4">
                <button className="text-stone-500 hover:text-teal-700 transition-colors text-sm font-medium hidden sm:block">
                  Help Center
                </button>
                <div className="relative group">
                    <button className="p-2 rounded-full hover:bg-stone-100 text-stone-600">
                        <User className="h-5 w-5" />
                    </button>
                    {onSignOut && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-stone-200 hidden group-hover:block">
                            <button 
                                onClick={onSignOut}
                                className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-100 w-full text-left"
                            >
                                Sign out
                            </button>
                        </div>
                    )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-8 mt-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-stone-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Closure.info. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-teal-700">Privacy</a>
            <a href="#" className="hover:text-teal-700">Terms</a>
            <a href="#" className="hover:text-teal-700">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
};