'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SmartDatePicker } from '@/components/forms/SmartDatePicker';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { cn } from '@/lib/utils';
import { SearchableSelect } from '@/components/ui/searchable-select';
import { getProvinces, getCities, type Province, type City } from '@/lib/api/database-options';

export interface ProfileFormProps {
  onSubmit: (data: ProfileFormData) => void;
  defaultValues?: Partial<ProfileFormData>;
  className?: string;
}

export type ProfileFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth?: Date | null;
  gender?: 'male' | 'female' | 'other';
  phone?: string;
  cityId?: string;
  profilePicture?: string;
  bio?: string;
  language?: 'fa' | 'en' | 'ar';
};

export function ProfileForm({
  onSubmit,
  defaultValues,
  className,
}: ProfileFormProps) {
  const { isRTL, t, language } = useLanguage();

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const profileSchema = useMemo(() => {
    return z.object({
      firstName: z.string().min(2, 'First name must be at least 2 characters'),
      lastName: z.string().min(2, 'Last name must be at least 2 characters'),
      email: z.string().email('Invalid email address').min(1, 'Email is required'),
      password: z.string().min(6, 'Password must be at least 6 characters'),
      confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
      dateOfBirth: z.date().nullable().optional(),
      gender: z.enum(['male', 'female', 'other']).optional(),
      phone: z.string().optional(),
      cityId: z.string().optional(),
      bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
    }).refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  const dateOfBirth = watch('dateOfBirth');
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
    <div className={cn('animate-in fade-in slide-in-from-right duration-500', className)}>
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2 sm:mb-3 text-balance">
          {t('profileInformation')}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          {t('profileDescription')}
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {t('firstName')} <span className="text-red-500">*</span>
            </label>
            <Input
              {...register('firstName')}
              placeholder={t('firstName')}
              className={cn('w-full h-11 sm:h-12 text-base', errors.firstName && 'border-red-500 focus-visible:ring-red-500')}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            {errors.firstName && (
              <p className="text-xs sm:text-sm text-red-500 flex items-center gap-1 mt-1.5">
                <span className="font-semibold">⚠</span> {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {t('lastName')} <span className="text-red-500">*</span>
            </label>
            <Input
              {...register('lastName')}
              placeholder={t('lastName')}
              className={cn('w-full h-11 sm:h-12 text-base', errors.lastName && 'border-red-500 focus-visible:ring-red-500')}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            {errors.lastName && (
              <p className="text-xs sm:text-sm text-red-500 flex items-center gap-1 mt-1.5">
                <span className="font-semibold">⚠</span> {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {t('email')} <span className="text-red-500">*</span>
          </label>
          <Input
            type="email"
            {...register('email')}
            placeholder={t('email')}
            className={cn('w-full h-11 sm:h-12 text-base', errors.email && 'border-red-500 focus-visible:ring-red-500')}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
          {errors.email && (
            <p className="text-xs sm:text-sm text-red-500 flex items-center gap-1 mt-1.5">
              <span className="font-semibold">⚠</span> {errors.email.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Password <span className="text-red-500">*</span>
            </label>
            <Input
              type="password"
              {...register('password')}
              placeholder="Enter password"
              className={cn('w-full h-11 sm:h-12 text-base', errors.password && 'border-red-500 focus-visible:ring-red-500')}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            {errors.password && (
              <p className="text-xs sm:text-sm text-red-500 flex items-center gap-1 mt-1.5">
                <span className="font-semibold">⚠</span> {errors.password.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <Input
              type="password"
              {...register('confirmPassword')}
              placeholder="Confirm password"
              className={cn('w-full h-11 sm:h-12 text-base', errors.confirmPassword && 'border-red-500 focus-visible:ring-red-500')}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            {errors.confirmPassword && (
              <p className="text-xs sm:text-sm text-red-500 flex items-center gap-1 mt-1.5">
                <span className="font-semibold">⚠</span> {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <SmartDatePicker
            label={t('dateOfBirth')}
            value={dateOfBirth || null}
            onChange={(date) => setValue('dateOfBirth', date || null, { shouldValidate: true })}
            error={errors.dateOfBirth?.message}
            className="h-11 sm:h-12"
          />
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {t('gender')}
            </label>
            <select
              {...register('gender')}
              className={cn(
                'flex h-11 sm:h-12 w-full rounded-md border border-input bg-white dark:bg-slate-800 px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                isRTL && 'text-right'
              )}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <option value="">{t('selectGender')}</option>
              <option value="male">{t('male')}</option>
              <option value="female">{t('female')}</option>
              <option value="other">{t('other')}</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {t('province')}
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
              {t('city')}
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
            {t('phone')}
          </label>
          <Input
            type="tel"
            {...register('phone')}
            placeholder={t('phone')}
            className="w-full h-11 sm:h-12 text-base"
            dir={isRTL ? 'rtl' : 'ltr'}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const event = new CustomEvent('goToStep', { detail: 0 });
              window.dispatchEvent(event);
            }}
            className="w-full sm:w-1/2 h-12 sm:h-13 text-base font-semibold order-2 sm:order-1"
          >
            {t('back')}
          </Button>
          <Button
            type="submit"
            className="w-full sm:w-1/2 h-12 sm:h-13 text-base font-semibold order-1 sm:order-2 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
          >
            {t('continue')}
            <span className="text-lg">{isRTL ? '←' : '→'}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
