import { ValidationRule, FormErrors } from '@/types';

/**
 * Valida um campo baseado nas regras fornecidas
 */
export function validateField(value: any, rules: ValidationRule[]): string | undefined {
  for (const rule of rules) {
    // Validação de campo obrigatório
    if (rule.required && (!value || value.toString().trim() === '')) {
      return rule.message || 'Este campo é obrigatório';
    }

    // Se o campo não é obrigatório e está vazio, pula outras validações
    if (!rule.required && (!value || value.toString().trim() === '')) {
      continue;
    }

    // Validação de tamanho mínimo
    if (rule.minLength && value.toString().length < rule.minLength) {
      return rule.message || `Deve ter pelo menos ${rule.minLength} caracteres`;
    }

    // Validação de tamanho máximo
    if (rule.maxLength && value.toString().length > rule.maxLength) {
      return rule.message || `Deve ter no máximo ${rule.maxLength} caracteres`;
    }

    // Validação de padrão (regex)
    if (rule.pattern && !rule.pattern.test(value.toString())) {
      return rule.message || 'Formato inválido';
    }

    // Validação customizada
    if (rule.validate) {
      const result = rule.validate(value);
      if (result !== true) {
        return typeof result === 'string' ? result : rule.message || 'Valor inválido';
      }
    }
  }

  return undefined;
}

/**
 * Valida todos os campos de um formulário
 */
export function validateForm(data: Record<string, any>, rules: Record<string, ValidationRule[]>): FormErrors {
  const errors: FormErrors = {};

  for (const [field, fieldRules] of Object.entries(rules)) {
    const error = validateField(data[field], fieldRules);
    if (error) {
      errors[field] = error;
    }
  }

  return errors;
}

/**
 * Verifica se há erros no formulário
 */
export function hasFormErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}

/**
 * Regras de validação comuns
 */
export const commonValidationRules = {
  required: (message?: string): ValidationRule => ({
    required: true,
    message: message || 'Este campo é obrigatório',
  }),

  email: (message?: string): ValidationRule => ({
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: message || 'Email deve ter um formato válido',
  }),

  minLength: (min: number, message?: string): ValidationRule => ({
    minLength: min,
    message: message || `Deve ter pelo menos ${min} caracteres`,
  }),

  maxLength: (max: number, message?: string): ValidationRule => ({
    maxLength: max,
    message: message || `Deve ter no máximo ${max} caracteres`,
  }),

  phone: (message?: string): ValidationRule => ({
    pattern: /^[0-9]{10,11}$/,
    message: message || 'Celular deve conter apenas números e ter 10 ou 11 dígitos',
  }),

  password: (message?: string): ValidationRule => ({
    minLength: 6,
    message: message || 'Senha deve ter pelo menos 6 caracteres',
  }),
};
