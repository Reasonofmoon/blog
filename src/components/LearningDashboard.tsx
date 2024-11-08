import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Star, 
  Trophy,
  Clock,
  TrendingUp,
  CheckCircle,
  Lock,
  ArrowRight
} from 'lucide-react';

const LearningDashboard = () => {
  const learningProgress = {
    overall: 45,
    currentModule: '프롬프트 기초',
    streak: 7,
    totalTime: '14h 30m',
    completedLessons: 12,
    totalLessons: 24
  };

  const modules = [
    {
      id: 1,
      title: '콘텐츠 기획 및 최적화',
      progress: 100,
      status: 'completed',
      lessons: [
        '양자 기반 주제 선정',
        '네이버 알고리즘 최적화',
        '콘텐츠 구조화'
      ]
    },
    {
      id: 2,
      title: '블로그 글쓰기 기초',
      progress: 75,
      status: 'in-progress',
      lessons: [
        '효과적인 제목 작성',
        '도입부 작성 기법',
        '결론 도출 방법'
      ]
    },
    {
      id: 3,
      title: 'SEO 최적화',
      progress: 0,
      status: 'locked',
      lessons: [
        '키워드 리서치',
        '메타 태그 최적화',
        '내부/외부 링크 전략'
      ]
    }
  ];

  const recentActivities = [
    {
      date: '오늘',
      activity: '도입부 작성 기법 완료',
      score: 95
    },
    {
      date: '어제',
      activity: '제목 작성법 실습',
      score: 88
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overall Progress Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <Trophy className="h-8 w-8 text-yellow-500" />
            <div>
              <p className="text-sm text-gray-500">전체 진행률</p>
              <p className="text-2xl font-bold">{learningProgress.overall}%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <TrendingUp className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">연속 학습</p>
              <p className="text-2xl font-bold">{learningProgress.streak}일</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <Clock className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">총 학습 시간</p>
              <p className="text-2xl font-bold">{learningProgress.totalTime}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <BookOpen className="h-8 w-8 text-purple-500" />
            <div>
              <p className="text-sm text-gray-500">완료한 레슨</p>
              <p className="text-2xl font-bold">
                {learningProgress.completedLessons}/{learningProgress.totalLessons}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Modules Section */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">학습 모듈</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {modules.map((module) => (
              <div key={module.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    {module.status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : module.status === 'locked' ? (
                      <Lock className="h-5 w-5 text-gray-400" />
                    ) : (
                      <BookOpen className="h-5 w-5 text-blue-500" />
                    )}
                    <h3 className="font-semibold">{module.title}</h3>
                  </div>
                  <span className="text-sm text-gray-500">{module.progress}%</span>
                </div>
                <Progress value={module.progress} className="mb-2" />
                <div className="mt-2">
                  <ul className="text-sm text-gray-600 space-y-1">
                    {module.lessons.map((lesson, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                        <span>{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities Section */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">최근 활동</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="text-sm text-gray-500">{activity.date}</span>
                  <p className="font-medium">{activity.activity}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="font-bold">{activity.score}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Continue Learning Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">현재 학습중</h3>
              <p className="text-gray-600">{learningProgress.currentModule}</p>
            </div>
            <Button className="flex items-center space-x-2">
              <span>계속하기</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningDashboard;