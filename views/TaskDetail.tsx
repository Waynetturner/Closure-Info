import React, { useState } from 'react';
import { Task, TaskCategory, TaskStatus } from '../types';
import { Button } from '../components/Button';
import { ArrowLeft, CheckCircle, FileText, Phone, ExternalLink, MessageSquare } from 'lucide-react';
import { askEstateQuestion } from '../services/geminiService';

interface TaskDetailProps {
  task: Task;
  onBack: () => void;
  onComplete: (taskId: string) => void;
  onGenerateDocument: (taskId: string) => void;
  deceasedName: string;
}

export const TaskDetail: React.FC<TaskDetailProps> = ({ 
  task, 
  onBack, 
  onComplete, 
  onGenerateDocument,
  deceasedName 
}) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [asking, setAsking] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setAsking(true);
    const response = await askEstateQuestion(question, `Deceased Name: ${deceasedName}. Task Context: ${task.title} - ${task.description}`);
    setAnswer(response);
    setAsking(false);
  };

  const isGovernment = task.category === TaskCategory.GOVERNMENT;
  const isFinancial = task.category === TaskCategory.FINANCIAL;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-6 pl-0 hover:bg-transparent hover:text-teal-700">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
      </Button>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="px-8 py-8 border-b border-stone-100">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-sm font-semibold text-teal-600 uppercase tracking-wider">{task.category}</span>
              <h1 className="text-3xl font-bold text-stone-900 mt-2">{task.title}</h1>
              <p className="text-lg text-stone-600 mt-3 leading-relaxed">{task.description}</p>
            </div>
            {task.status === TaskStatus.COMPLETED && (
               <span className="bg-teal-100 text-teal-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center">
                 <CheckCircle className="w-3 h-3 mr-1"/> Completed
               </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 space-y-10">
          
          {/* Requirements Section */}
          <section>
            <h3 className="text-lg font-semibold text-stone-900 mb-4">What you'll need</h3>
            <ul className="space-y-3">
              {task.requiresDocuments.map((doc, idx) => (
                <li key={idx} className="flex items-start text-stone-600">
                  <div className="h-1.5 w-1.5 rounded-full bg-teal-500 mt-2.5 mr-3 flex-shrink-0" />
                  {doc}
                </li>
              ))}
              <li className="flex items-start text-stone-600">
                  <div className="h-1.5 w-1.5 rounded-full bg-teal-500 mt-2.5 mr-3 flex-shrink-0" />
                  Deceased's Social Security Number
              </li>
            </ul>
          </section>

          {/* Action Section */}
          <section className="bg-stone-50 rounded-xl p-6 border border-stone-200">
            <h3 className="text-lg font-semibold text-stone-900 mb-4">How to complete this task</h3>
            
            {isGovernment && (
               <div className="space-y-4">
                 <div className="flex items-start p-4 bg-white rounded-lg border border-stone-200">
                    <Phone className="h-6 w-6 text-teal-700 mr-4 mt-1" />
                    <div>
                      <h4 className="font-medium text-stone-900">Call Social Security</h4>
                      <p className="text-sm text-stone-600 mt-1">1-800-772-1213 (8am - 7pm Weekdays)</p>
                      <p className="text-xs text-stone-500 mt-2">Wait times are typically shortest Wed-Fri after 4pm.</p>
                    </div>
                 </div>
               </div>
            )}

            {isFinancial && (
                <div className="space-y-4">
                   <p className="text-stone-600 mb-4">Most banks require a formal letter of instruction along with the death certificate. We can generate this for you.</p>
                   <Button variant="secondary" className="w-full sm:w-auto" onClick={() => onGenerateDocument(task.id)}>
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Account Closure Letter
                   </Button>
                </div>
            )}
            
            {!isGovernment && !isFinancial && (
                 <div className="flex items-start p-4 bg-white rounded-lg border border-stone-200">
                    <ExternalLink className="h-6 w-6 text-teal-700 mr-4 mt-1" />
                    <div>
                      <h4 className="font-medium text-stone-900">Visit Provider Website</h4>
                      <p className="text-sm text-stone-600 mt-1">Log in to the account or search for "Deceased Account Handling" on their support page.</p>
                    </div>
                 </div>
            )}

          </section>

          {/* Q&A Helper */}
          <section className="border-t border-stone-100 pt-8">
            <h3 className="text-lg font-semibold text-stone-900 mb-4 flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-amber-500"/>
              Have a question about this step?
            </h3>
            <div className="flex gap-2">
                <input 
                    className="flex-1 border border-stone-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                    placeholder="e.g. Do I need an original death certificate?"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                />
                <Button onClick={handleAsk} disabled={asking || !question} size="sm">Ask AI</Button>
            </div>
            {answer && (
                <div className="mt-4 p-4 bg-amber-50 text-stone-800 rounded-lg text-sm border border-amber-100">
                    <strong>Assistant:</strong> {answer}
                </div>
            )}
          </section>

        </div>

        {/* Footer */}
        <div className="bg-stone-50 px-8 py-6 border-t border-stone-200 flex justify-end">
          {task.status !== TaskStatus.COMPLETED ? (
            <Button onClick={() => onComplete(task.id)}>Mark as Complete</Button>
          ) : (
            <Button variant="outline" disabled>Completed</Button>
          )}
        </div>
      </div>
    </div>
  );
};