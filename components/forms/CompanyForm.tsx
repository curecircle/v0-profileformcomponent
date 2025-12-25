'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { SearchableSelect } from '@/components/ui/searchable-select';
import { getProvinces, getCities, type Province, type City } from '@/lib/api/database-options';

const companySchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  companyType: z.enum(['pharmaceutical', 'medical_equipment', 'insurance', 'other']),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  phone: z.string().min(10, 'Phone must be at least 10 characters'),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  description: z.string().max(1000, 'Description must be less than 1000 characters').optional(),
  establishedYear: z.number().min(1900).max(new Date().getFullYear()),
  employeeCount: z.number().min(1, 'Employee count must be at least 1').optional(),
  cityId: z.string().optional(),
  registrationDocument: z.string().optional(),
  representativeIdCard: z.string().optional(),
});

export type CompanyFormData = z.infer<typeof companySchema>;

export interface CompanyFormProps {
  onSubmit: (data: CompanyFormData) => void;
  defaultValues?: Partial<CompanyFormData>;
  className?: string;
}

export function CompanyForm({
  onSubmit,
  defaultValues,
  className,
}: CompanyFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues,
  });

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  
  const { t, isRTL, language } = useLanguage();

  const cityId = watch('cityId');

  useEffect(() => {
    const fetchProvinces = async () => {
      setLoading(true);
      try {
        const provs = await getProvinces();
        setProvinces(provs);
      } catch (error) {
        console.error('[v0] Failed to fetch provinces:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (!selectedProvinceId) {
        setCities([]);
        return;
      }
      try {
        const cityList = await getCities(selectedProvinceId);
        setCities(cityList);
      } catch (error) {
        console.error('[v0] Failed to fetch cities:', error);
      }
    };
    fetchCities();
  }, [selectedProvinceId]);

  return (
    <Card className={cn('border-2 shadow-xl animate-in fade-in slide-in-from-right duration-500', className)}>
      <CardHeader className="space-y-2 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-xl sm:text-2xl">{t('companyInformation')}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {t('enterCompanyDetails')}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {t('province')} <span className="text-red-500">*</span>
              </label>
              <SearchableSelect
                options={provinces.map(p => ({
                  value: p.id,
                  label: language === 'en' ? p.name_en : p.name
                }))}
                value={selectedProvinceId}
                onValueChange={(value) => {
                  setSelectedProvinceId(value);
                  setValue('cityId', ''); // Reset city when province changes
                }}
                placeholder={t('selectProvince')}
                searchPlaceholder={t('searchProvince')}
                emptyText={t('noProvinceFound')}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {t('city')} <span className="text-red-500">*</span>
              </label>
              <SearchableSelect
                options={cities.map(c => ({
                  value: c.id,
                  label: language === 'en' ? c.name_en : c.name
                }))}
                value={cityId || ''}
                onValueChange={(value) => setValue('cityId', value, { shouldValidate: true })}
                placeholder={t('selectCity')}
                searchPlaceholder={t('searchCity')}
                emptyText={selectedProvinceId ? t('noCityFound') : t('selectProvinceFirst')}
                disabled={!selectedProvinceId || cities.length === 0}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {t('companyName')} <span className="text-red-500">*</span>
            </label>
            <input
              {...register('companyName')}
              placeholder={t('enterCompanyName')}
              className="flex h-11 sm:h-12 w-full rounded-md border-2 border-input bg-white dark:bg-slate-900 px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent"
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            {errors.companyName && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                {errors.companyName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {t('companyType')} <span className="text-red-500">*</span>
            </label>
            <select
              {...register('companyType')}
              className="flex h-11 sm:h-12 w-full rounded-md border-2 border-input bg-white dark:bg-slate-900 px-3 py-2 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent"
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <option value="">{t('selectType')}</option>
              <option value="pharmaceutical">{t('pharmaceutical')}</option>
              <option value="medical_equipment">{t('medicalEquipment')}</option>
              <option value="insurance">{t('insurance')}</option>
              <option value="other">{t('other')}</option>
            </select>
            {errors.companyType && (
              <p className="text-xs text-red-500">{errors.companyType.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {t('address')} <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('address')}
              rows={3}
              className="flex w-full rounded-md border-2 border-input bg-white dark:bg-slate-900 px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent"
              placeholder={t('enterCompanyAddress')}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            {errors.address && (
              <p className="text-xs text-red-500">{errors.address.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {t('phone')} <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                {...register('phone')}
                placeholder={t('enterPhoneNumber')}
                className="flex h-11 sm:h-12 w-full rounded-md border-2 border-input bg-white dark:bg-slate-900 px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent"
                dir={isRTL ? 'rtl' : 'ltr'}
              />
              {errors.phone && (
                <p className="text-xs text-red-500">{errors.phone.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {t('website')}
              </label>
              <input
                type="url"
                {...register('website')}
                placeholder="https://example.com"
                className="flex h-11 sm:h-12 w-full rounded-md border-2 border-input bg-white dark:bg-slate-900 px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent"
              />
              {errors.website && (
                <p className="text-xs text-red-500">{errors.website.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {t('establishedYear')} <span className="text-red-500">*</span>
              </label>
              <select
                {...register('establishedYear', { valueAsNumber: true })}
                className="flex h-11 sm:h-12 w-full rounded-md border-2 border-input bg-white dark:bg-slate-900 px-3 py-2 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent"
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <option value="">{t('selectYear')}</option>
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              {errors.establishedYear && (
                <p className="text-xs text-red-500">{errors.establishedYear.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {t('employeeCount')}
              </label>
              <input
                type="number"
                {...register('employeeCount', { valueAsNumber: true })}
                placeholder={t('enterEmployeeCount')}
                min={1}
                className="flex h-11 sm:h-12 w-full rounded-md border-2 border-input bg-white dark:bg-slate-900 px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent"
                dir={isRTL ? 'rtl' : 'ltr'}
              />
              {errors.employeeCount && (
                <p className="text-xs text-red-500">{errors.employeeCount.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {t('description')}
            </label>
            <textarea
              {...register('description')}
              rows={4}
              className="flex w-full rounded-md border-2 border-input bg-white dark:bg-slate-900 px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent"
              placeholder={t('tellAboutCompany')}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            {errors.description && (
              <p className="text-xs text-red-500">{errors.description.message}</p>
            )}
          </div>

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
