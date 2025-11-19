import React, { useState } from 'react';
import { Button } from '../components/Button';
import { generateLetter } from '../services/geminiService';
import { ArrowLeft, Download, FileText, RefreshCw } from 'lucide-react';
import { DeceasedProfile } from '../types';

interface DocumentGeneratorProps {
  profile: DeceasedProfile;
  taskId: string;
  onBack: () => void;
  onComplete: () => void;
}

export const DocumentGenerator: React.FC<DocumentGeneratorProps> = ({
  profile,
  taskId,
  onBack,
  onComplete
}) => {
  const [inputs, setInputs] = useState({
    bankName: '',
    accountType: 'Checking',
    accountNumber: '',
    relationship: 'Executor'
  });
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const content = await generateLetter(
      profile.fullName,
      inputs.bankName,
      inputs.accountType,
      inputs.accountNumber,
      inputs.relationship
    );
    setGeneratedContent(content);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-6 pl-0">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Task
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                <h2 className="text-xl font-semibold text-stone-900 mb-4">Account Details</h2>
                <p className="text-sm text-stone-500 mb-6">We'll use this to draft a formal letter to the institution.</p>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">Institution Name</label>
                        <input 
                            className="w-full border border-stone-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                            placeholder="e.g. Wells Fargo"
                            value={inputs.bankName}
                            onChange={e => setInputs({...inputs, bankName: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">Account Type</label>
                        <select 
                            className="w-full border border-stone-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                            value={inputs.accountType}
                            onChange={e => setInputs({...inputs, accountType: e.target.value})}
                        >
                            <option>Checking Account</option>
                            <option>Savings Account</option>
                            <option>Investment Account</option>
                            <option>Credit Card</option>
                            <option>Loan</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">Account Number (Last 4 digits ok)</label>
                        <input 
                            className="w-full border border-stone-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                            placeholder="e.g. XXXXX-1234"
                            value={inputs.accountNumber}
                            onChange={e => setInputs({...inputs, accountNumber: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">Your Relationship</label>
                        <select 
                            className="w-full border border-stone-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                            value={inputs.relationship}
                            onChange={e => setInputs({...inputs, relationship: e.target.value})}
                        >
                            <option>Executor / Administrator</option>
                            <option>Spouse</option>
                            <option>Child</option>
                            <option>Next of Kin</option>
                        </select>
                    </div>
                </div>
                
                <div className="mt-6">
                    <Button 
                        onClick={handleGenerate} 
                        isLoading={loading}
                        disabled={!inputs.bankName}
                        className="w-full"
                    >
                        {generatedContent ? 'Regenerate Letter' : 'Generate Letter'}
                    </Button>
                </div>
            </div>
            
            {generatedContent && (
                 <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 text-sm text-amber-800">
                    <strong>Next Steps:</strong> Print this letter, sign it, and mail it via Certified Mail along with a certified copy of the death certificate.
                 </div>
            )}
        </div>

        {/* Preview */}
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden flex flex-col h-[600px]">
            <div className="bg-stone-100 px-4 py-3 border-b border-stone-200 flex justify-between items-center">
                <span className="text-sm font-medium text-stone-600">Preview</span>
                {generatedContent && (
                    <button className="text-teal-700 hover:text-teal-800 text-sm font-medium flex items-center">
                        <Download className="h-4 w-4 mr-1" /> PDF
                    </button>
                )}
            </div>
            <div className="flex-1 p-8 overflow-y-auto font-serif text-stone-800 whitespace-pre-wrap leading-relaxed text-sm">
                {generatedContent ? (
                    generatedContent
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-stone-400">
                        <FileText className="h-12 w-12 mb-4 opacity-20" />
                        <p>Fill out the details to generate a preview</p>
                    </div>
                )}
            </div>
            {generatedContent && (
                <div className="p-4 border-t border-stone-200 bg-stone-50">
                    <Button onClick={onComplete} variant="primary" className="w-full">
                        I've Sent This
                    </Button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};