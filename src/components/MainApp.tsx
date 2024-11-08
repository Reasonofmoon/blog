import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Home,
  BookOpen,
  Layout,
  Award,
  Settings,
  User
} from 'lucide-react';
import LearningDashboard from './LearningDashboard';
import PromptEducation from './PromptEducation';
import PromptPractice from './PromptPractice';

const MainApp = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  
  const navigation = [
    {
      name: '대시보드',
      icon: Home,
      view: 'dashboard',
    },
    {
      name: '학습하기',
      icon: BookOpen,
      view: 'learn',
    },
    {
      name: '실습하기',
      icon: Layout,
      view: 'practice',
    },
    {
      name: '업적',
      icon: Award,
      view: 'achievements',
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-blue-600">블로그 프롬프트 마스터</h1>
              </div>
            </div>
            
            <div className="flex items-center">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar Navigation */}
          <div className="w-64 flex-shrink-0">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-1">
                  {navigation.map((item) => (
                    <Button
                      key={item.name}
                      variant={currentView === item.view ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setCurrentView(item.view)}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Card>
              <CardContent className="p-6">
                {currentView === 'dashboard' && <LearningDashboard />}
                {currentView === 'learn' && <PromptEducation />}
                {currentView === 'practice' && <PromptPractice />}
                {currentView === 'achievements' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">업적</h2>
                    {/* Achievement content */}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Quick Access Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between py-3">
            <div className="flex items-center">
              <span className="text-sm text-gray-500">
                현재 진행중: 프롬프트 기초 학습
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Button size="sm" variant="outline">
                학습 이어하기
              </Button>
              <Button size="sm">
                다음 레슨
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainApp;