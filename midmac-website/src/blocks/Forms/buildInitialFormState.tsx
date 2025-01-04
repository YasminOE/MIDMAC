import type { FormFieldBlock, CheckboxField } from '@payloadcms/plugin-form-builder/types'

type FormState = Record<string, string | boolean>

export const buildInitialFormState = (fields: FormFieldBlock[] | null | undefined): FormState => {
  if (!fields) return {}
  
  return fields.reduce<FormState>((initialSchema, field) => {
    // Skip fields without a blockName
    if (!('blockName' in field) || typeof field.blockName !== 'string') return initialSchema

    if (field.blockType === 'checkbox') {
      const checkboxField = field as CheckboxField
      return {
        ...initialSchema,
        [field.blockName]: checkboxField.defaultValue || false,
      }
    }

    // All other field types default to empty string
    return {
      ...initialSchema,
      [field.blockName]: '',
    }
  }, {})
}