'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { SearchableSelect } from '@/components/ui/searchable-select';
import { 
  getUniversities, 
  getDegrees, 
  getSpecialties,
  getFaculties,
  type University,
  type Degree,
  type Specialty,
  type Faculty
} from '@/lib/api/database-options';

export interface EducationFormData {
  universityId: string;
  degreeId: string;
  specialtyId: string;
  startYear: number;
  endYear: number | null;
  status: 'in_progress' | 'completed';
}

export interface StudentFormProps {
  onSubmit: (data: EducationFormData[]) => void;
  defaultValues?: EducationFormData[];
  className?: string;
}

export function StudentForm({
  onSubmit,
  defaultValues = [],
  className,
}: StudentFormProps) {
  const [educations, setEducations] = useState<EducationFormData[]>(
    defaultValues.length > 0 ? defaultValues : [
      {
        universityId: '',
        degreeId: '',
        specialtyId: '',
        startYear: new Date().getFullYear(),
        endYear: null,
        status: 'in_progress',
      },
    ]
  );

  const addEducation = () => {
    setEducations([
      ...educations,
      {
        universityId: '',
        degreeId: '',
        specialtyId: '',
        startYear: new Date().getFullYear(),
        endYear: null,
        status: 'in_progress',
      },
    ]);
  };

  const removeEducation = (index: number) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  const updateEducation = (index: number, field: keyof EducationFormData, value: any) => {
    const updated = [...educations];
    updated[index] = { ...updated[index], [field]: value };
    setEducations(updated);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = educations.every(edu => 
      edu.universityId && 
      edu.degreeId && 
      edu.specialtyId && 
      edu.startYear
    );
    
    if (!isValid) {
      alert('Please fill all required fields');
      return;
    }
    
    onSubmit(educations);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  const [universities, setUniversities] = useState<University[]>([]);
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);

  const { t, isRTL, language } = useLanguage();

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const [univs, degs, facs, specs] = await Promise.all([
          getUniversities(),
          getDegrees(),
          getFaculties(),
          getSpecialties(),
        ]);
        setUniversities(univs);
        setDegrees(degs);
        setFaculties(facs);
        setSpecialties(specs);
      } catch (error) {
        console.error('[v0] Failed to fetch options:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOptions();
  }, []);

  return (
    <Card className={cn('border-2 shadow-xl animate-in fade-in slide-in-from-right duration-500', className)}>
      <CardHeader className="space-y-2 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-xl sm:text-2xl">{t('educationInformation')}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {t('addCurrentEducation')}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleFormSubmit} className="space-y-5 sm:space-y-6">
          {educations.map((education, index) => (
            <div
              key={index}
              className="p-5 sm:p-6 border-2 border-slate-200 dark:border-slate-700 rounded-xl space-y-4 sm:space-y-5 bg-slate-50/50 dark:bg-slate-800/50 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-sm font-bold">
                    {index + 1}
                  </span>
                  {t('education')} {index + 1}
                </h3>
                {educations.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeEducation(index)}
                    className="h-9 w-9 p-0 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {t('university')} <span className="text-red-500">*</span>
                </label>
                <SearchableSelect
                  options={universities.map(u => ({
                    value: u.id,
                    label: language === 'en' ? u.name_en : u.name
                  }))}
                  value={education.universityId}
                  onValueChange={(value) => updateEducation(index, 'universityId', value)}
                  placeholder={t('selectUniversity')}
                  searchPlaceholder={t('searchUniversity')}
                  emptyText={t('noUniversityFound')}
                  disabled={loading}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {t('degree')} <span className="text-red-500">*</span>
                  </label>
                  <SearchableSelect
                    options={degrees.map(d => ({
                      value: d.id,
                      label: language === 'en' ? d.name_en : d.name
                    }))}
                    value={education.degreeId}
                    onValueChange={(value) => updateEducation(index, 'degreeId', value)}
                    placeholder={t('selectDegree')}
                    searchPlaceholder={t('searchDegree')}
                    emptyText={t('noDegreeFound')}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {t('specialty')} <span className="text-red-500">*</span>
                  </label>
                  <SearchableSelect
                    options={specialties.map(s => ({
                      value: s.id,
                      label: language === 'en' ? s.name_en : s.name
                    }))}
                    value={education.specialtyId}
                    onValueChange={(value) => updateEducation(index, 'specialtyId', value)}
                    placeholder={t('selectSpecialty')}
                    searchPlaceholder={t('searchSpecialty')}
                    emptyText={t('noSpecialtyFound')}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {t('startYear')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={education.startYear.toString()}
                    onChange={(e) => updateEducation(index, 'startYear', parseInt(e.target.value))}
                    className="flex h-11 sm:h-12 w-full rounded-md border-2 border-input bg-white dark:bg-slate-900 px-3 py-2 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent"
                    required
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {t('endYear')}
                  </label>
                  <select
                    value={education.endYear?.toString() || ''}
                    onChange={(e) => updateEducation(index, 'endYear', e.target.value ? parseInt(e.target.value) : null)}
                    className="flex h-11 sm:h-12 w-full rounded-md border-2 border-input bg-white dark:bg-slate-900 px-3 py-2 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={education.status === 'in_progress'}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    <option value="">{t('selectYear')}</option>
                    {years.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {t('status')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={education.status}
                    onChange={(e) => {
                      updateEducation(index, 'status', e.target.value as 'in_progress' | 'completed');
                      if (e.target.value === 'in_progress') {
                        updateEducation(index, 'endYear', null);
                      }
                    }}
                    className="flex h-11 sm:h-12 w-full rounded-md border-2 border-input bg-white dark:bg-slate-900 px-3 py-2 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent"
                    required
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    <option value="in_progress">{t('inProgress')}</option>
                    <option value="completed">{t('completed')}</option>
                  </select>
                </div>
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={addEducation}
            className="w-full h-12 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 text-base font-semibold transition-all"
          >
            <Plus className="w-5 h-5 mr-2" />
            {t('addEducation')}
          </Button>

          <div className={cn('flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 border-t-2', isRTL && 'sm:flex-row-reverse')}>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const event = new CustomEvent('goToStep', { detail: 1 });
                window.dispatchEvent(event);
              }}
              className="w-full sm:w-1/2 h-12 sm:h-13 text-base font-semibold order-2 sm:order-1"
            >
              {t('back')}
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-1/2 h-12 sm:h-13 text-base font-semibold order-1 sm:order-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
            >
              {t('continue')} →
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
