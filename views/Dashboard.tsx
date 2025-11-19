import React from 'react';
import { Task, TaskCategory, TaskStatus, DeceasedProfile } from '../types';
import { ProgressBar } from '../components/ProgressBar';
import { Button } from '../components/Button';
import { CheckCircle2, Circle, Clock, ChevronRight } from 'lucide-react';

interface DashboardProps {
  tasks: Task[];
  profile: DeceasedProfile;
  onSelectTask: (taskId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ tasks, profile, onSelectTask }) => {
  const completedCount = tasks.filter(t => t.status === TaskStatus.COMPLETED).length;
  const progress = completedCount / tasks.length;

  // Group tasks by category
  const groupedTasks = Object.values(TaskCategory).map(category => ({
    category,
    tasks: tasks.filter(t => t.category === category)
  }));

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Welcome & Progress */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-200 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-teal-900 mb-1">Estate Overview for {profile.fullName}</h1>
            <p className="text-stone-500">You've completed {completedCount} of {tasks.length} tasks</p>
          </div>
          <div className="mt-4 sm:mt-0">
            {progress > 0 && progress < 1 && (
              <Button variant="primary" onClick={() => {
                const firstIncomplete = tasks.find(t => t.status !== TaskStatus.COMPLETED);
                if (firstIncomplete) onSelectTask(firstIncomplete.id);
              }}>
                Continue Where I Left Off
              </Button>
            )}
          </div>
        </div>
        <ProgressBar current={completedCount} total={tasks.length} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Task List */}
        <div className="lg:col-span-2 space-y-6">
          {groupedTasks.map((group) => (
            <div key={group.category} className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
              <div className="bg-stone-50 px-6 py-4 border-b border-stone-200">
                <h3 className="font-semibold text-stone-800 flex items-center justify-between">
                  {group.category}
                  <span className="text-xs font-normal text-stone-500 bg-white px-2 py-1 rounded border border-stone-200">
                    {group.tasks.filter(t => t.status === TaskStatus.COMPLETED).length} / {group.tasks.length}
                  </span>
                </h3>
              </div>
              <div className="divide-y divide-stone-100">
                {group.tasks.map(task => (
                  <div 
                    key={task.id} 
                    className={`p-4 flex items-center justify-between hover:bg-stone-50 transition-colors cursor-pointer group ${task.status === TaskStatus.COMPLETED ? 'opacity-70' : ''}`}
                    onClick={() => onSelectTask(task.id)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="mt-1 flex-shrink-0">
                        {task.status === TaskStatus.COMPLETED ? (
                          <CheckCircle2 className="h-5 w-5 text-teal-600" />
                        ) : task.status === TaskStatus.IN_PROGRESS ? (
                          <Clock className="h-5 w-5 text-amber-500" />
                        ) : (
                          <Circle className="h-5 w-5 text-stone-300 group-hover:text-stone-400" />
                        )}
                      </div>
                      <div>
                        <h4 className={`font-medium ${task.status === TaskStatus.COMPLETED ? 'text-stone-500 line-through' : 'text-stone-800'}`}>
                          {task.title}
                        </h4>
                        <p className="text-sm text-stone-500 mt-0.5 line-clamp-1">{task.description}</p>
                        <span className="text-xs text-stone-400 mt-1 inline-block">Est. {task.estimatedTime}</span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-stone-300 group-hover:text-stone-400" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-teal-800 rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-2">Need help?</h3>
            <p className="text-teal-100 text-sm mb-4">
              Our AI assistant can help answer questions about probate, taxes, and specific forms.
            </p>
            <Button variant="secondary" size="sm" className="w-full bg-teal-700 text-white hover:bg-teal-600 border-none">
              Ask a Question
            </Button>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <h3 className="font-semibold text-stone-800 mb-4">Recent Documents</h3>
            <div className="text-center py-8 text-stone-400 text-sm bg-stone-50 rounded-lg border border-dashed border-stone-300">
              No documents generated yet.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};