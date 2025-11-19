import React from 'react';
import { Button } from '../components/Button';
import { CheckCircle, FileText, ListChecks, Shield } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-5xl px-4 pt-16 pb-24 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-teal-900 tracking-tight mb-6">
          Settling an estate doesn't have to be overwhelming.
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-stone-600 mb-10 leading-relaxed">
          Step-by-step guidance through every form, notification, and account closure after losing someone. 
          Secure, compassionate, and at your own pace.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={onGetStarted}>Get Started</Button>
          <Button variant="outline" size="lg">How It Works</Button>
        </div>
      </section>

      {/* Value Props */}
      <section className="w-full bg-white py-16 border-y border-stone-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="bg-teal-50 p-4 rounded-full mb-6">
                <ListChecks className="h-8 w-8 text-teal-700" />
              </div>
              <h3 className="text-lg font-semibold text-stone-900 mb-3">Know exactly what to do</h3>
              <p className="text-stone-600">We create a personalized checklist based on your specific situation, filtering out the noise.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-teal-50 p-4 rounded-full mb-6">
                <FileText className="h-8 w-8 text-teal-700" />
              </div>
              <h3 className="text-lg font-semibold text-stone-900 mb-3">Auto-fill paperwork</h3>
              <p className="text-stone-600">Upload a death certificate once. We pull the data to auto-fill forms for banks and agencies.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-teal-50 p-4 rounded-full mb-6">
                <CheckCircle className="h-8 w-8 text-teal-700" />
              </div>
              <h3 className="text-lg font-semibold text-stone-900 mb-3">Track your progress</h3>
              <p className="text-stone-600">See what's done and what's pending. Share access with family members to collaborate.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Note */}
      <section className="w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center bg-stone-100 px-6 py-3 rounded-full text-stone-600 text-sm">
            <Shield className="h-4 w-4 mr-2 text-stone-500" />
            <span>Bank-level encryption protects your data. We never share personal information.</span>
        </div>
      </section>
    </div>
  );
};