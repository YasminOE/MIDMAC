'use client'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useSearchParams } from 'next/navigation'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { getClientSideURL } from '@/utilities/getURL'
import { cn } from '@/utilities/cn'

export type Value = unknown

export interface Property {
  [key: string]: Value
}

export interface Data {
  [key: string]: Property | Property[]
}

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: SerializedEditorState
}

interface FormData {
  name: string
  phone: string
  email: string
  location: string
  spaceSize: string
  projectName: string
  projectType: string
  otherProjectType?: string
  hasBrandDesign: string
  driveLink?: string
  description: string
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  const searchParams = useSearchParams();
  const isArabic = searchParams?.get('locale') === 'ar';

  const translations = {
    name: isArabic ? 'الاسم' : 'Name',
    phone: isArabic ? 'رقم الجوال' : 'Phone Number',
    email: isArabic ? 'الايميل' : 'Email',
    location: isArabic ? 'موقع المشروع' : 'Location',
    spaceSize: isArabic ? 'المساحة' : 'Space Size',
    projectName: isArabic ? 'اسم المشروع' : 'Project Name',
    projectType: isArabic ? 'نوع المشروع' : 'Project Type',
    projectTypes: {
      coffee: isArabic ? 'قهوة' : 'COFFEE',
      restaurant: isArabic ? 'مطعم' : 'RESTAURANT',
      office: isArabic ? 'مكتب' : 'OFFICE',
      spa: isArabic ? 'سبا' : 'SPA',
      other: isArabic ? 'أخرى..' : 'OTHER..'
    },
    hasBrandDesign: isArabic ? 'هل لديك هوية تصميمية للمشروع؟' : 'Do you have brand design?',
    yes: isArabic ? 'نعم' : 'YES',
    no: isArabic ? 'لا' : 'NO',
    driveLinkPlaceholder: isArabic ? 'أضف رابط قوقل درايف من فضلك..' : 'Add Google drive link please..',
    describeProject: isArabic ? 'نبذة عن المشروع' : 'DESCRIBE YOUR PROJECT',
    writePlaceholder: isArabic ? 'اكتب هنا....' : 'WRITE HERE....',
    submit: isArabic ? 'إرسال' : 'SUBMIT',
    thankYou: isArabic ? 'شكراً لتواصلك معنا' : 'THANK YOU FOR CONTACTING US',
    pleaseWait: isArabic ? 'يرجى الانتظار حتى نتواصل معك' : 'PLEASE WAIT UNTIL WE CONTACT YOU',
    loading: isArabic ? 'جاري التحميل، يرجى الانتظار...' : 'Loading, please wait...'
  };

  const formMethods = useForm<FormData>()
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: FormData) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value: value || '',
        }))

        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)
            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })
            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect
            const redirectUrl = url
            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <div className="">
      <div className="bg-[#1E1E1E] rounded min-h-[300px] relative px-8 md:px-0">
        <FormProvider {...formMethods}>
          {/* Confirmation Modal Overlay */}
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            <div className="fixed inset-0 backdrop-blur-[2px] z-50 flex items-center justify-center px-4">
              <div className={`bg-[#1E1E1E] border border-[#DAD2C2]/20 rounded-[24px] ${
                isArabic 
                  ? 'py-8 md:py-10 px-6 md:px-8 w-[80%] md:w-[450px] max-w-[450px]' 
                  : 'py-8 md:py-10 px-6 md:px-8 w-[80%] md:w-[450px] max-w-[450px]'
              } mx-auto text-center`}>
                <h2 className={`${
                  isArabic 
                    ? 'text-xl md:text-2xl mb-2 md:mb-2 font-light' 
                    : 'text-lg md:text-xl mb-2'
                }`}>
                  {translations.thankYou}
                </h2>
                <p className={`${
                  isArabic 
                    ? 'text-sm md:text-base text-[#DAD2C2]/80' 
                    : 'text-xs md:text-sm text-[#DAD2C2]'
                }`}>
                  {translations.pleaseWait}
                </p>
              </div>
            </div>
          )}

          {/* Loading Overlay */}
          {isLoading && !hasSubmitted && (
            <div className="fixed inset-0 backdrop-blur-[2px] z-50 flex items-center justify-center">
              <p className="text-center text-[#DAD2C2]">{translations.loading}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
              <div className="bg-red-500/10 border border-red-900 rounded-lg px-4 py-2 text-[#DAD2C2]">
                {`${error.status || '500'}: ${error.message || ''}`}
              </div>
            </div>
          )}

          {/* Form */}
          <form id={formID} onSubmit={handleSubmit(onSubmit)} className="px-4 py-4 md:py-12" dir={isArabic ? 'rtl' : 'ltr'}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {/* First row - Name, Phone, Email */}
              <div className="space-y-2">
                <label className="text-sm text-[#DAD2C2] uppercase">{translations.name}</label>
                <input
                  type="text"
                  {...register('name')}
                  className="w-full h-10 bg-[#1E1E1E] border-[0.5px] border-[#DAD2C2] text-[#DAD2C2] rounded-lg px-3 text-sm focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-[#DAD2C2] uppercase">{translations.phone}</label>
                <input
                  type="tel"
                  {...register('phone')}
                  className="w-full h-10 bg-[#1E1E1E] border-[0.5px] border-[#DAD2C2] text-[#DAD2C2] rounded-lg px-3 text-sm focus:outline-none"
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-[#DAD2C2] uppercase">{translations.email}</label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full h-10 bg-[#1E1E1E] border-[0.5px] border-[#DAD2C2] text-[#DAD2C2] rounded-lg px-3 text-sm focus:outline-none"
                  dir="ltr"
                />
              </div>

              {/* Second row - Location, Space Size, Project Name */}
              <div className="space-y-2">
                <label className="text-sm text-[#DAD2C2] uppercase">{translations.location}</label>
                <input
                  type="text"
                  {...register('location')}
                  className="w-full h-10 bg-[#1E1E1E] border-[0.5px] border-[#DAD2C2] text-[#DAD2C2] rounded-lg px-3 text-sm focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-[#DAD2C2] uppercase">{translations.spaceSize}</label>
                <input
                  type="text"
                  {...register('spaceSize')}
                  className="w-full h-10 bg-[#1E1E1E] border-[0.5px] border-[#DAD2C2] text-[#DAD2C2] rounded-lg px-3 text-sm focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-[#DAD2C2] uppercase">{translations.projectName}</label>
                <input
                  type="text"
                  {...register('projectName')}
                  className="w-full h-10 bg-[#1E1E1E] border-[0.5px] border-[#DAD2C2] text-[#DAD2C2] rounded-lg px-3 text-sm focus:outline-none"
                />
              </div>

              {/* Third row - Project Type and Brand Design */}
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="text-sm text-[#DAD2C2] uppercase">{translations.projectType}</label>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {[
                    translations.projectTypes.coffee,
                    translations.projectTypes.restaurant,
                    translations.projectTypes.office,
                    translations.projectTypes.spa,
                    translations.projectTypes.other
                  ].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setValue('projectType', type.toLowerCase())}
                      className={cn(
                        'h-9 px-4 rounded-lg text-sm transition-colors whitespace-nowrap',
                        watch('projectType') === type.toLowerCase()
                          ? 'bg-[#1E1E1E] border-[0.5px] border-[#DAD2C2] text-[#DAD2C2]'
                          : 'bg-[#DAD2C2] text-black hover:bg-[#DAD2C2]/90'
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                {watch('projectType') === translations.projectTypes.other.toLowerCase() && (
                  <input
                    type="text"
                    {...register('otherProjectType')}
                    className="w-full h-10 bg-[#1E1E1E] border-[0.5px] border-[#DAD2C2] text-[#DAD2C2] rounded-lg px-3 text-sm focus:outline-none mt-2"
                  />
                )}
              </div>

              <div className="col-span-1 space-y-2">
                <label className="text-sm text-[#DAD2C2] uppercase">{translations.hasBrandDesign}</label>
                <div className="flex gap-2 md:gap-3">
                  {[translations.yes, translations.no].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setValue('hasBrandDesign', option.toLowerCase())}
                      className={cn(
                        'h-9 px-6 rounded-lg text-sm transition-colors flex-1 md:flex-none',
                        watch('hasBrandDesign') === option.toLowerCase()
                          ? 'bg-[#DAD2C2] text-black hover:bg-[#DAD2C2]/90'
                          : 'bg-[#1E1E1E] border-[0.5px] border-[#DAD2C2] text-[#DAD2C2] hover:bg-[#1E1E1E]/90'
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {watch('hasBrandDesign') === translations.yes.toLowerCase() && (
                  <input
                    type="text"
                    placeholder={translations.driveLinkPlaceholder}
                    {...register('driveLink')}
                    className="w-full h-10 bg-[#1E1E1E] border-[0.5px] border-[#DAD2C2] text-[#DAD2C2] rounded-lg px-3 text-sm focus:outline-none mt-4"
                    dir="ltr"
                  />
                )}
              </div>

              {/* Project Description */}
              <div className="col-span-1 md:col-span-full mt-2 md:mt-2">
                <h2 className="text-sm text-[#DAD2C2] mb-4">{translations.describeProject}</h2>
                <textarea
                  placeholder={translations.writePlaceholder}
                  {...register('description')}
                  className={`w-full min-h-[150px] md:min-h-[200px] bg-[#1E1E1E] border-[0.5px] border-[#DAD2C2] text-[#DAD2C2] rounded-lg px-3 py-2 text-sm focus:outline-none placeholder:text-[#666666] ${isArabic ? 'placeholder:text-right' : ''}`}
                />
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-[#DAD2C2] text-black py-2 md:py-2 rounded-lg text-sm md:text-base hover:bg-[#DAD2C2]/90 transition-colors"
              >
                {translations.submit}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

