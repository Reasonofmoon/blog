import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  Star
} from 'lucide-react';

const PromptPractice = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [prompt, setPrompt] = useState('');
  const [feedback, setFeedback] = useState<any>(null);

  const practiceSteps = [
    {
      title: "주제 선정 프롬프트",
      description: "블로그 주제를 도출하기 위한 프롬프트를 작성해보세요.",
      requirements: [
        "타겟 독자층 명시",
        "주제 범위 설정",
        "트렌드 반영 요청",
        "양자 기반 키워드 분석 요청",
        "네이버 알고리즘 최적화 고려"
      ],
      example: {
        good: "20-30대 직장인을 타겟으로 하는 재테크 관련 블로그 주제를 추천해주세요. 최근 금융 트렌드를 반영하고, 네이버 검색 알고리즘에 최적화된 키워드를 포함해주세요. 양자 기반 키워드 분석을 통해 경쟁이 적은 틈새 주제를 찾아주세요.",
        bad: "블로그 주제 추천해주세요."
      }
    },
    {
      title: "콘텐츠 구조화 프롬프트",
      description: "선정된 주제에 대한 콘텐츠 구조를 설계하는 프롬프트를 작성해보세요.",
      requirements: [
        "섹션별 구성 요청",
        "키워드 밀도 최적화",
        "독자 몰입도 고려",
        "SEO 최적화 요소 포함",
        "양자 기반 구조 분석"
      ],
      example: {
        good: "재테크 초보를 위한 블로그 포스트의 구조를 설계해주세요. 각 섹션은 2-3문단으로 구성하고, 주요 키워드의 적절한 배치와 함께 독자의 이해도를 고려한 순차적 구성을 해주세요. 양자 기반 분석을 통해 최적의 콘텐츠 길이와 구조를 제안해주세요.",
        bad: "글 구조 만들어주세요."
      }
    }
  ];

  const analyzeFeedback = (input: string) => {
    const currentStepRequirements = practiceSteps[currentStep].requirements;
    const feedback = {
      score: 0,
      strengths: [] as string[],
      weaknesses: [] as string[],
      suggestions: [] as string[]
    };

    // 길이 분석
    if (input.length > 100) {
      feedback.score += 20;
      feedback.strengths.push("충분한 설명 제공");
    } else {
      feedback.weaknesses.push("설명이 부족함");
      feedback.suggestions.push("더 자세한 설명을 추가해보세요");
    }

    // 요구사항 분석
    currentStepRequirements.forEach(req => {
      const reqWords = req.toLowerCase().split(' ');
      const hasRequirement = reqWords.some(word => 
        input.toLowerCase().includes(word)
      );

      if (hasRequirement) {
        feedback.score += 15;
        feedback.strengths.push(`${req} 요구사항 충족`);
      } else {
        feedback.weaknesses.push(`${req} 관련 내용 누락`);
        feedback.suggestions.push(`${req}에 대한 내용을 추가해보세요`);
      }
    });

    // 구체성 분석
    const specificWords = ['구체적', '자세히', '예시', '예를 들어'];
    const hasSpecifics = specificWords.some(word => 
      input.toLowerCase().includes(word)
    );

    if (hasSpecifics) {
      feedback.score += 10;
      feedback.strengths.push("구체적인 설명 포함");
    } else {
      feedback.suggestions.push("더 구체적인 예시나 설명을 추가해보세요");
    }

    return feedback;
  };

  const handleSubmit = () => {
    const result = analyzeFeedback(prompt);
    setFeedback(result);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">프롬프트 작성 실습</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {currentStep + 1}/{practiceSteps.length}
          </span>
          <Progress value={(currentStep + 1) / practiceSteps.length * 100} className="w-32" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">{practiceSteps[currentStep].title}</h3>
          <p className="text-gray-600">{practiceSteps[currentStep].description}</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">요구사항</h4>
              <ul className="list-disc pl-5 space-y-1">
                {practiceSteps[currentStep].requirements.map((req, index) => (
                  <li key={index} className="text-gray-600">{req}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">예시</h4>
              <div className="p-3 bg-green-50 rounded border border-green-200">
                <div className="flex items-center space-x-2 mb-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-green-700 font-medium">좋은 예시</span>
                </div>
                <p className="text-green-800">{practiceSteps[currentStep].example.good}</p>
              </div>
              <div className="p-3 bg-red-50 rounded border border-red-200">
                <div className="flex items-center space-x-2 mb-1">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-red-700 font-medium">나쁜 예시</span>
                </div>
                <p className="text-red-800">{practiceSteps[currentStep].example.bad}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">프롬프트 작성</h4>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="프롬프트를 작성해보세요..."
                className="min-h-[120px]"
              />
              <Button onClick={handleSubmit} className="w-full">
                평가받기
              </Button>
            </div>

            {feedback && (
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">평가 결과</h4>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="font-bold text-lg">{feedback.score}/100</span>
                  </div>
                </div>

                {feedback.strengths.length > 0 && (
                  <div className="p-3 bg-green-50 rounded">
                    <h5 className="font-medium text-green-800 mb-2">잘한 점</h5>
                    <ul className="list-disc pl-5 space-y-1">
                      {feedback.strengths.map((strength, index) => (
                        <li key={index} className="text-green-700">{strength}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {feedback.weaknesses.length > 0 && (
                  <div className="p-3 bg-red-50 rounded">
                    <h5 className="font-medium text-red-800 mb-2">개선이 필요한 점</h5>
                    <ul className="list-disc pl-5 space-y-1">
                      {feedback.weaknesses.map((weakness, index) => (
                        <li key={index} className="text-red-700">{weakness}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {feedback.suggestions.length > 0 && (
                  <div className="p-3 bg-blue-50 rounded">
                    <h5 className="font-medium text-blue-800 mb-2">제안사항</h5>
                    <ul className="list-disc pl-5 space-y-1">
                      {feedback.suggestions.map((suggestion, index) => (
                        <li key={index} className="text-blue-700">{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button
                  onClick={() => {
                    if (currentStep < practiceSteps.length - 1) {
                      setCurrentStep(prev => prev + 1);
                      setPrompt('');
                      setFeedback(null);
                    }
                  }}
                  className="w-full"
                  disabled={currentStep === practiceSteps.length - 1}
                >
                  <span>다음 단계</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PromptPractice;