'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProfileFormData } from './ProfileForm';
import { EducationFormData } from './StudentForm';
import { CompanyFormData } from './CompanyForm';
import { UserRole } from '@/components/auth/RoleSelection';
import { Edit } from 'lucide-react';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { cn } from '@/lib/utils';

export interface ReviewFormProps {
  role: UserRole;
  profileData: ProfileFormData;
  professionalData: EducationFormData[] | CompanyFormData;
  onEdit: (step: number) => void;
  onSubmit: () => void;
  loading?: boolean;
  className?: string;
}

export function ReviewForm({
  role,
  profileData,
  professionalData,
  onEdit,
  onSubmit,
  loading = false,
  className,
}: ReviewFormProps) {
  const { isRTL, t } = useLanguage();

  const formatDate = (date: Date | null | undefined): string => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className={cn('animate-in fade-in slide-in-from-right duration-500', className)}>
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl lg:text-3xl text-balance">
          {t('registration.steps.review')}
        </CardTitle>
        <p className="text-sm sm:text-base text-muted-foreground mt-2 text-pretty leading-relaxed">
          {t('registration.review.subtitle')}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Information */}
        <div className="space-y-4">
          <div className={cn('flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3', isRTL && 'sm:flex-row-reverse')}>
            <h3 className="text-lg sm:text-xl font-semibold text-balance">
              {t('registration.profile.title')}
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onEdit(1)}
              className={cn('w-full sm:w-auto h-10 sm:h-11 flex items-center gap-2', isRTL && 'flex-row-reverse')}
            >
              <Edit className="w-4 h-4" />
              {t('registration.buttons.edit')}
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 sm:p-5 bg-muted rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{t('registration.profile.firstName')}</p>
              <p className="font-semibold text-base break-words">{profileData.firstName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">{t('registration.profile.lastName')}</p>
              <p className="font-semibold text-base break-words">{profileData.lastName}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-sm text-muted-foreground mb-1">{t('registration.profile.email')}</p>
              <p className="font-semibold text-base break-words">{profileData.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">{t('registration.profile.dateOfBirth')}</p>
              <p className="font-semibold text-base">{formatDate(profileData.dateOfBirth)}</p>
            </div>
            {profileData.gender && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t('registration.profile.gender')}</p>
                <p className="font-semibold text-base capitalize">{profileData.gender}</p>
              </div>
            )}
            {profileData.phone && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t('registration.profile.phone')}</p>
                <p className="font-semibold text-base break-words">{profileData.phone}</p>
              </div>
            )}
            {profileData.cityId && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t('registration.profile.city')}</p>
                <p className="font-semibold text-base break-words">{profileData.cityId}</p>
              </div>
            )}
          </div>
        </div>

        {/* Professional Information */}
        <div className="space-y-4">
          <div className={cn('flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3', isRTL && 'sm:flex-row-reverse')}>
            <h3 className="text-lg sm:text-xl font-semibold text-balance">
              {role === 'company' 
                ? t('registration.company.title')
                : t('registration.education.title')}
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onEdit(2)}
              className={cn('w-full sm:w-auto h-10 sm:h-11 flex items-center gap-2', isRTL && 'flex-row-reverse')}
            >
              <Edit className="w-4 h-4" />
              {t('registration.buttons.edit')}
            </Button>
          </div>
          <div className="p-4 sm:p-5 bg-muted rounded-lg">
            {role === 'company' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Company Name</p>
                  <p className="font-semibold text-base break-words">
                    {(professionalData as CompanyFormData).companyName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Company Type</p>
                  <p className="font-semibold text-base capitalize">
                    {(professionalData as CompanyFormData).companyType?.replace('_', ' ')}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {(professionalData as EducationFormData[]).map((education, index) => (
                  <div key={index} className="p-4 bg-background rounded-md border">
                    <h4 className="font-semibold mb-3 text-base">Education {index + 1}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">University</p>
                        <p className="font-semibold text-base break-words">{education.universityId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Degree</p>
                        <p className="font-semibold text-base break-words">{education.degreeId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Specialty</p>
                        <p className="font-semibold text-base break-words">{education.specialtyId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Status</p>
                        <p className="font-semibold text-base capitalize">
                          {education.status.replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className={cn('flex flex-col sm:flex-row gap-3 pt-6 border-t', isRTL && 'sm:flex-row-reverse')}>
          <Button
            type="button"
            variant="outline"
            onClick={() => onEdit(2)}
            className="flex-1 h-12 sm:h-13 text-base font-semibold"
            disabled={loading}
          >
            {t('registration.buttons.back')}
          </Button>
          <Button
            type="button"
            onClick={onSubmit}
            disabled={loading}
            className="flex-1 h-12 sm:h-13 text-base font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
          >
            {loading 
              ? t('registration.buttons.submitting')
              : t('registration.buttons.submit')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
