import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Une clases de Tailwind resolviendo conflictos entre utilidades. */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
