'use client'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
// import RichText from '@/components/Richtext'
import { SerializeLexical } from '@/components/Richtext/Lexical'
// import { Button } from '@/components/ui/form/button'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

// import { buildInitialFormState } from './buildInitialFormState'
// import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import { cn } from '@/utilities/cn'

// import type {
//     SerializedTextNode,

//   } from '@payloadcms/richtext-lexical'

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

        // delay loading indicator by 1s
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
      <div className="bg-[#1E1E1E] rounded min-h-[300px] relative">
        <FormProvider {...formMethods}>
          {/* Confirmation Modal Overlay */}
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            <div className="fixed inset-0 backdrop-blur-[2px] z-50 flex items-center justify-center">
              <div className="bg-[#1E1E1E] border border-[#DAD2C2]/20 rounded-lg p-6 max-w-md mx-4 text-center">
                <h2 className="text-lg md:text-xl uppercase mb-2">
                  THANK YOU FOR CONTACTING US
                </h2>
                <p className="text-xs md:text-sm text-[#DAD2C2]">
                  PLEASE WAITH UNTIL WE CONTACT YOU
                </p>
              </div>
            </div>
          )}

          {/* Loading Overlay */}
          {isLoading && !hasSubmitted && (
            <div className="fixed inset-0 backdrop-blur-[2px] z-50 flex items-center justify-center">
              <p className="text-center text-[#DAD2C2]">Loading, please wait...</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
              <div className="bg-red-500/10 border border-red-500 rounded-lg px-4 py-2">
                {`${error.status || '500'}: ${error.message || ''}`}
              </div>
            </div>
          )}

          {/* Form */}
          <form id={formID} onSubmit={handleSubmit(onSubmit)} className="px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {/* First row - Name, Phone, Email */}
              <div className="space-y-2">
                <label className="text-sm text-[#DAD2C2] uppercase">Name</label>
                <input
                  type="text"
                  {...register('name')}
                  className="w-full h-10 bg-[#1E1E1E] border-[0.5px] border-[#DAD2C2] text-[#DAD2C2] rounded px-3 text-sm focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-[#DAD2C2] uppercase">Phone Number</label>
                <input
                  type="tel"
                  {...register('phone')}
                  className="w-full h-10 bg-[#1E1E1E] border-[0.5px] border-[#DAD2C2] text-[#DAD2C2] rounded px-3 text-sm focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-[#DAD2C2] uppercase">Email</label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full h-10 bg-[#1E1E1E] border-[0.5px] border-[#DAD2C2] text-[#DAD2C2] rounded px-3 text-sm focus:outline-none"
                />
              </div>

              {/* Second row - Location, Space Size, Project Name */}
              <div className="space-y-2">
                <label className="text-sm text-[#DAD2C2] uppercase">Location</label>
                <input
                  type="text"
                  {...register('location')}
                  className="w-full h-10 bg-[#1E1E1E] border-[0.5px] border-[#DAD2C2] text-[#DAD2C2] rounded px-3 text-sm focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-[#DAD2C2] uppercase">Space Size</label>
                <input
                  type="text"
                  {...register('spaceSize')}
                  className="w-full h-10 bg-[#1E1E1E] border-[0.5px] border-[#DAD2C2] text-[#DAD2C2] rounded px-3 text-sm focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-[#DAD2C2] uppercase">Project Name</label>
                <input
                  type="text"
                  {...register('projectName')}
                  className="w-full h-10 bg-[#1E1E1E] border-[0.5px] border-[#DAD2C2] text-[#DAD2C2] rounded px-3 text-sm focus:outline-none"
                />
              </div>

              {/* Third row - Project Type and Brand Design */}
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="text-sm text-[#DAD2C2] uppercase">Project Type</label>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {['COFFEE', 'RESTAURANT', 'OFFICE', 'SPA', 'OTHER..'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setValue('projectType', type.toLowerCase())}
                      className={cn(
                        'h-9 px-4 rounded text-sm transition-colors whitespace-nowrap',
                        watch('projectType') === type.toLowerCase()
                          ? 'bg-[#1E1E1E] border-[0.5px] border-[#DAD2C2] text-[#DAD2C2]'
                          : 'bg-[#DAD2C2] text-black hover:bg-[#DAD2C2]/90'
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                {watch('projectType') === 'other..' && (
                  <input
                    type="text"
                    {...register('otherProjectType')}
                    className="w-full h-10 bg-[#1E1E1E] border-[0.5px] border-[#DAD2C2] text-[#DAD2C2] rounded px-3 text-sm focus:outline-none mt-2"
                  />
                )}
              </div>

              <div className="col-span-1 space-y-2">
                <label className="text-sm text-[#DAD2C2] uppercase">Do you have brand design?</label>
                <div className="flex gap-2 md:gap-3">
                  {['YES', 'NO'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setValue('hasBrandDesign', option.toLowerCase())}
                      className={cn(
                        'h-9 px-6 rounded text-sm transition-colors flex-1 md:flex-none',
                        watch('hasBrandDesign') === option.toLowerCase()
                          ? 'bg-[#DAD2C2] text-black hover:bg-[#DAD2C2]/90'
                          : 'bg-[#1E1E1E] border-[0.5px] border-[#DAD2C2] text-[#DAD2C2] hover:bg-[#1E1E1E]/90'
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {watch('hasBrandDesign') === 'yes' && (
                  <input
                    type="text"
                    placeholder="Add Google drive link please.."
                    {...register('driveLink')}
                    className="w-full h-10 bg-[#1E1E1E] border-[0.5px] border-[#DAD2C2] text-[#DAD2C2] rounded px-3 text-sm focus:outline-none mt-4"
                  />
                )}
              </div>

              {/* Project Description */}
              <div className="col-span-1 md:col-span-full mt-2 md:mt-2">
                <h2 className="text-sm text-[#DAD2C2] mb-4">DESCRIBE YOUR PROJECT</h2>
                <textarea
                  placeholder="WRITE HERE...."
                  {...register('description')}
                  className="w-full min-h-[150px] md:min-h-[200px] bg-[#1E1E1E] border-[0.5px] border-[#DAD2C2] text-[#DAD2C2] rounded px-3 py-2 text-sm focus:outline-none placeholder:text-[#666666]"
                />
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-[#DAD2C2] text-black py-2 md:py-2 rounded text-sm md:text-base hover:bg-[#DAD2C2]/90 transition-colors"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

