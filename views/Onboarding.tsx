import React, { useState } from 'react';
import { Button } from '../components/Button';
import { DeceasedProfile } from '../types';
import { ArrowLeft, ChevronRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: DeceasedProfile) => void;
  onCancel: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<DeceasedProfile>({
    fullName: '',
    dateOfBirth: '',
    dateOfDeath: '',
    residenceState: 'IA',
    hasWill: null,
    estateValueEstimate: '',
  });

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => Math.max(0, prev - 1));
  
  const updateProfile = (key: keyof DeceasedProfile, value: any) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const renderStep = () => {
    switch (step) {
      case 0: // Account Creation (Simulated)
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-stone-900">First, let's create your private account</h2>
              <p className="text-stone-600">This allows you to save progress and return later.</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Email Address</label>
                <input type="email" className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Password</label>
                <input type="password" className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none" placeholder="••••••••" />
              </div>
            </div>
            <div className="pt-4">
              <Button onClick={handleNext} className="w-full sm:w-auto">Create Account</Button>
              <p className="text-xs text-stone-500 mt-4">Your information is encrypted and never shared.</p>
            </div>
          </div>
        );

      case 1: // Name
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-stone-900">What was their full legal name?</h2>
            <p className="text-stone-600">We'll use this to populate official forms.</p>
            <input 
              type="text" 
              value={profile.fullName}
              onChange={(e) => updateProfile('fullName', e.target.value)}
              className="w-full text-lg border border-stone-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="e.g. Robert James Smith"
              autoFocus
            />
          </div>
        );

      case 2: // Dates
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-stone-900">Important Dates</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Date of Birth</label>
                <input 
                  type="date" 
                  value={profile.dateOfBirth}
                  onChange={(e) => updateProfile('dateOfBirth', e.target.value)}
                  className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Date of Death</label>
                <input 
                  type="date" 
                  value={profile.dateOfDeath}
                  onChange={(e) => updateProfile('dateOfDeath', e.target.value)}
                  className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
            </div>
          </div>
        );
      
      case 3: // State & Will
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-stone-900">Estate Details</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">State of Residence</label>
                <select 
                  value={profile.residenceState}
                  onChange={(e) => updateProfile('residenceState', e.target.value)}
                  className="w-full border border-stone-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                >
                  <option value="IA">Iowa</option>
                  <option value="MN">Minnesota</option>
                  <option value="WI">Wisconsin</option>
                  <option value="IL">Illinois</option>
                  <option value="MO">Missouri</option>
                  <option value="NE">Nebraska</option>
                  <option value="SD">South Dakota</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Did they have a will?</label>
                <div className="flex space-x-4">
                  <button 
                    onClick={() => updateProfile('hasWill', true)}
                    className={`flex-1 py-3 px-4 rounded-lg border ${profile.hasWill === true ? 'bg-teal-50 border-teal-500 text-teal-800' : 'border-stone-300 hover:bg-stone-50'}`}
                  >
                    Yes
                  </button>
                  <button 
                    onClick={() => updateProfile('hasWill', false)}
                    className={`flex-1 py-3 px-4 rounded-lg border ${profile.hasWill === false ? 'bg-teal-50 border-teal-500 text-teal-800' : 'border-stone-300 hover:bg-stone-50'}`}
                  >
                    No / Unsure
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      {/* Progress Dots */}
      <div className="flex justify-center space-x-2 mb-12">
        {[0, 1, 2, 3].map(i => (
          <div 
            key={i} 
            className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-teal-600' : i < step ? 'w-2 bg-teal-600' : 'w-2 bg-stone-300'}`}
          />
        ))}
      </div>

      {/* Card */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 min-h-[400px] flex flex-col justify-between">
        <div className="animate-fade-in">
          {renderStep()}
        </div>

        {step > 0 && (
          <div className="flex justify-between mt-8 pt-6 border-t border-stone-100">
            <Button variant="ghost" onClick={step === 0 ? onCancel : handleBack}>
              <span className="flex items-center"><ArrowLeft className="w-4 h-4 mr-2"/> Back</span>
            </Button>
            <Button onClick={step === 3 ? () => onComplete(profile) : handleNext}>
              {step === 3 ? 'Complete Setup' : <span className="flex items-center">Continue <ChevronRight className="w-4 h-4 ml-2"/></span>}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};