'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HorizontalWizard, WizardStep } from '@/components/forms/HorizontalWizard';
import { RoleSelection, UserRole } from '@/components/auth/RoleSelection';
import { ProfileForm, ProfileFormData } from '@/components/forms/ProfileForm';
import { StudentForm, EducationFormData as StudentEducationFormData } from '@/components/forms/StudentForm';
import { GraduateForm, EducationFormData as GraduateEducationFormData } from '@/components/forms/GraduateForm';
import { CompanyForm, CompanyFormData } from '@/components/forms/CompanyForm';
import { ReviewForm } from '@/components/forms/ReviewForm';
import {
  Alert,
  AlertTitle,
  AlertDescription
} from '@/components/ui/alert';
import { LanguageSwitcher } from '@/components/auth/LanguageSwitcher';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { cn } from '@/lib/utils';

export default function RegisterPage() {
  const router = useRouter();
  const { t, isRTL, language } = useLanguage();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [profileData, setProfileData] = useState<ProfileFormData | null>(null);
  const [professionalData, setProfessionalData] = useState<StudentEducationFormData[] | GraduateEducationFormData[] | CompanyFormData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const handleRoleContinue = (event: CustomEvent) => {
      const role = event.detail as UserRole;
      setSelectedRole(role);
      setCurrentStep(1);
    };

    const handleGoToStep = (event: CustomEvent) => {
      const step = event.detail as number;
      setCurrentStep(step);
    };

    window.addEventListener('roleContinue', handleRoleContinue as EventListener);
    window.addEventListener('goToStep', handleGoToStep as EventListener);

    return () => {
      window.removeEventListener('roleContinue', handleRoleContinue as EventListener);
      window.removeEventListener('goToStep', handleGoToStep as EventListener);
    };
  }, []);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleProfileSubmit = (data: ProfileFormData) => {
    setProfileData(data);
    setCurrentStep(2);
  };

  const handleProfessionalSubmit = (data: StudentEducationFormData[] | GraduateEducationFormData[] | CompanyFormData) => {
    setProfessionalData(data);
    setCurrentStep(3);
  };

  const handleReviewSubmit = async () => {
    if (!selectedRole || !profileData || !professionalData) {
      setError('Please complete all steps');
      return;
    }

    try {
      setError(null);
      setSuccess(false);
      setLoading(true);

      console.log('[v0] Registration data:', {
        role: selectedRole,
        profile: profileData,
        professional: professionalData,
      });

      await new Promise(resolve => setTimeout(resolve, 2000));

      setSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleStepChange = (step: number) => {
    if (step < currentStep) {
      setCurrentStep(step);
    }
  };

  const steps: WizardStep[] = [
    {
      id: 'role',
      title: t('role'),
      component: (
        <RoleSelection
          selectedRole={selectedRole}
          onRoleSelect={handleRoleSelect}
        />
      ),
    },
    {
      id: 'profile',
      title: t('profile'),
      component: (
        <ProfileForm
          onSubmit={handleProfileSubmit}
          defaultValues={profileData || undefined}
        />
      ),
    },
    {
      id: 'professional',
      title: t('details'),
      component:
        selectedRole === 'company' ? (
          <CompanyForm
            onSubmit={handleProfessionalSubmit}
            defaultValues={(professionalData as CompanyFormData) || undefined}
          />
        ) : selectedRole === 'student' ? (
          <StudentForm
            onSubmit={handleProfessionalSubmit}
            defaultValues={(professionalData as StudentEducationFormData[]) || undefined}
          />
        ) : selectedRole === 'graduate' ? (
          <GraduateForm
            onSubmit={handleProfessionalSubmit}
            defaultValues={(professionalData as GraduateEducationFormData[]) || undefined}
          />
        ) : null,
    },
    {
      id: 'review',
      title: t('review'),
      component:
        selectedRole && profileData && professionalData ? (
          <ReviewForm
            role={selectedRole}
            profileData={profileData}
            professionalData={professionalData}
            onEdit={handleStepChange}
            onSubmit={handleReviewSubmit}
            loading={loading}
          />
        ) : null,
    },
  ];

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className={cn('min-h-screen flex items-center justify-center py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden')} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50/80 to-purple-50/60 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 -z-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmOWZhZmMiIGZpbGwtb3BhY2l0eT0iMC40Ij48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-40 dark:opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent dark:from-slate-900/50"></div>
      </div>
      
      <div className="w-full max-w-7xl relative z-10">
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-white/40 dark:border-white/10 p-5 sm:p-8 lg:p-10">
          <div className={cn('mb-5 sm:mb-6 flex items-center justify-between', isRTL ? 'flex-row-reverse' : '')}>
            <div className="flex-1" />
            <LanguageSwitcher />
          </div>

          <div className="mb-6 sm:mb-8 lg:mb-10 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 dark:from-slate-100 dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent mb-3 sm:mb-4 text-balance leading-tight">
              {language === 'fa' ? 'ایجاد حساب کاربری' : language === 'ar' ? 'إنشاء حسابك' : 'Create Your Account'}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto text-pretty leading-relaxed">
              {language === 'fa' ? 'فرآیند ثبت‌نام را تکمیل کنید' : language === 'ar' ? 'أكمل عملية التسجيل للبدء' : 'Complete the registration process to get started'}
            </p>
          </div>

          <div>
            {error && (
              <Alert variant="destructive" className="mb-5 sm:mb-6 animate-in slide-in-from-top duration-300 border-2">
                <AlertTitle>Error:</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-5 sm:mb-6 animate-in slide-in-from-top duration-300 border-2 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                <AlertTitle className="text-green-800 dark:text-green-200">Success!</AlertTitle>
                <AlertDescription className="text-green-700 dark:text-green-300">Registration completed successfully. Redirecting...</AlertDescription>
              </Alert>
            )}

            <HorizontalWizard
              steps={steps}
              currentStep={currentStep}
              onStepChange={handleStepChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
