import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { LandingPage } from './views/LandingPage';
import { Onboarding } from './views/Onboarding';
import { Dashboard } from './views/Dashboard';
import { TaskDetail } from './views/TaskDetail';
import { DocumentGenerator } from './views/DocumentGenerator';
import { AppView, Task, TaskCategory, TaskStatus, DeceasedProfile } from './types';

// Initial Dummy Data
const INITIAL_TASKS: Task[] = [
  {
    id: 'soc-sec',
    title: 'Notify Social Security Administration',
    category: TaskCategory.GOVERNMENT,
    status: TaskStatus.NOT_STARTED,
    description: 'Social Security must be notified as soon as possible to stop benefit payments and determine survivor benefits.',
    estimatedTime: '30 mins',
    requiresDocuments: ['Death Certificate', 'Deceased SSN']
  },
  {
    id: 'dmv',
    title: 'Cancel Driver\'s License (DMV)',
    category: TaskCategory.GOVERNMENT,
    status: TaskStatus.NOT_STARTED,
    description: 'Contact the Department of Transportation to cancel the license and prevent identity theft.',
    estimatedTime: '1 hour',
    requiresDocuments: ['Death Certificate', 'License Number']
  },
  {
    id: 'bank-close',
    title: 'Close Primary Bank Accounts',
    category: TaskCategory.FINANCIAL,
    status: TaskStatus.NOT_STARTED,
    description: 'Notify banks to freeze or close accounts and distribute funds to the estate or beneficiaries.',
    estimatedTime: '2-3 weeks',
    requiresDocuments: ['Death Certificate', 'Letters Testamentary (if probate)', 'Will']
  },
  {
    id: 'utilities',
    title: 'Transfer or Cancel Utilities',
    category: TaskCategory.UTILITIES,
    status: TaskStatus.NOT_STARTED,
    description: 'Electricity, water, internet, and phone services need to be transferred to a surviving spouse or canceled.',
    estimatedTime: '2 hours',
    requiresDocuments: ['Account Numbers', 'Death Certificate (sometimes)']
  },
  {
    id: 'credit-bureaus',
    title: 'Notify Credit Bureaus',
    category: TaskCategory.FINANCIAL,
    status: TaskStatus.NOT_STARTED,
    description: 'Contact Equifax, Experian, and TransUnion to place a "Deceased" flag on the credit report.',
    estimatedTime: '1 hour',
    requiresDocuments: ['Death Certificate']
  }
];

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [profile, setProfile] = useState<DeceasedProfile | null>(null);

  // Handlers
  const handleGetStarted = () => setCurrentView(AppView.ONBOARDING);
  
  const handleOnboardingComplete = (newProfile: DeceasedProfile) => {
    setProfile(newProfile);
    setCurrentView(AppView.DASHBOARD);
  };

  const handleTaskSelect = (taskId: string) => {
    setActiveTaskId(taskId);
    setCurrentView(AppView.TASK_DETAIL);
  };

  const handleTaskComplete = (taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: TaskStatus.COMPLETED } : t));
    setCurrentView(AppView.DASHBOARD);
    setActiveTaskId(null);
  };

  const handleGenerateDocument = (taskId: string) => {
    setActiveTaskId(taskId);
    setCurrentView(AppView.DOCUMENT_GENERATOR);
  };

  const handleDocumentSent = () => {
    if (activeTaskId) {
      handleTaskComplete(activeTaskId);
    }
  };

  const handleSignOut = () => {
    setProfile(null);
    setTasks(INITIAL_TASKS);
    setCurrentView(AppView.LANDING);
  }

  // View Routing
  const renderView = () => {
    switch (currentView) {
      case AppView.LANDING:
        return <LandingPage onGetStarted={handleGetStarted} />;
      
      case AppView.ONBOARDING:
        return <Onboarding onComplete={handleOnboardingComplete} onCancel={() => setCurrentView(AppView.LANDING)} />;
      
      case AppView.DASHBOARD:
        if (!profile) return null;
        return (
          <Dashboard 
            tasks={tasks} 
            profile={profile} 
            onSelectTask={handleTaskSelect} 
          />
        );
      
      case AppView.TASK_DETAIL:
        const task = tasks.find(t => t.id === activeTaskId);
        if (!task || !profile) return null;
        return (
          <TaskDetail 
            task={task} 
            deceasedName={profile.fullName}
            onBack={() => setCurrentView(AppView.DASHBOARD)}
            onComplete={handleTaskComplete}
            onGenerateDocument={handleGenerateDocument}
          />
        );

      case AppView.DOCUMENT_GENERATOR:
        if (!activeTaskId || !profile) return null;
        return (
           <DocumentGenerator
             taskId={activeTaskId}
             profile={profile}
             onBack={() => setCurrentView(AppView.TASK_DETAIL)}
             onComplete={handleDocumentSent}
           />
        );

      default:
        return <LandingPage onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <Layout 
      showNav={currentView !== AppView.LANDING && currentView !== AppView.ONBOARDING}
      onSignOut={currentView !== AppView.LANDING ? handleSignOut : undefined}
    >
      {renderView()}
    </Layout>
  );
}

export default App;