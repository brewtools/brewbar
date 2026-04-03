import type { Bean } from '@/types'

export interface ValidationError {
  field: string
  message: string
}

export function validateBean(bean: Bean): ValidationError[] {
  const errors: ValidationError[] = []

  if (!bean.roaster.trim()) {
    errors.push({ field: 'roaster', message: 'Roaster is required' })
  } else if (bean.roaster.length > 50) {
    errors.push({ field: 'roaster', message: 'Roaster must be 50 characters or less' })
  }

  if (!bean.name.trim()) {
    errors.push({ field: 'name', message: 'Bean name is required' })
  } else if (bean.name.length > 50) {
    errors.push({ field: 'name', message: 'Bean name must be 50 characters or less' })
  }

  if (!bean.origin.trim()) {
    errors.push({ field: 'origin', message: 'Origin is required' })
  } else if (bean.origin.length > 50) {
    errors.push({ field: 'origin', message: 'Origin must be 50 characters or less' })
  }

  if (!bean.varietal.trim()) {
    errors.push({ field: 'varietal', message: 'Varietal is required' })
  } else if (bean.varietal.length > 50) {
    errors.push({ field: 'varietal', message: 'Varietal must be 50 characters or less' })
  }

  if (!bean.roastProfile.trim()) {
    errors.push({ field: 'roastProfile', message: 'Roast profile is required' })
  } else if (bean.roastProfile.length > 20) {
    errors.push({ field: 'roastProfile', message: 'Roast profile must be 20 characters or less' })
  }

  if (bean.tastingNotes.length > 6) {
    errors.push({ field: 'tastingNotes', message: 'Maximum 6 tasting notes allowed' })
  }

  return errors
}

export function validateFile(file: File): ValidationError[] {
  const errors: ValidationError[] = []
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedTypes = ['image/jpeg', 'image/png']
  const allowedExtensions = ['.jpg', '.jpeg', '.png']

  if (!allowedTypes.includes(file.type)) {
    errors.push({ field: 'file', message: 'Only JPG and PNG files are allowed' })
  }

  const extension = '.' + file.name.split('.').pop()?.toLowerCase()
  if (!allowedExtensions.includes(extension)) {
    errors.push({ field: 'file', message: 'File must be .jpg, .jpeg, or .png' })
  }

  if (file.size > maxSize) {
    errors.push({ field: 'file', message: 'File size must be 5MB or less' })
  }

  return errors
}

export function validateLogo(file: File): ValidationError[] {
  const errors: ValidationError[] = []
  const maxSize = 2 * 1024 * 1024 // 2MB
  const allowedTypes = ['image/png', 'image/svg+xml', 'image/jpeg']

  if (!allowedTypes.includes(file.type)) {
    errors.push({ field: 'logo', message: 'Only PNG, SVG, and JPG files are allowed' })
  }

  if (file.size > maxSize) {
    errors.push({ field: 'logo', message: 'Logo size must be 2MB or less' })
  }

  return errors
}