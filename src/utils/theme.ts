/**
 * Utilitário para ler variáveis CSS definidas no :root
 * Isso permite que o Three.js use as mesmas cores do Tailwind/shadcn
 */
export const getThemeColor = (variableName: string): string => {
  if (typeof window === 'undefined') return '#000000';
  
  // Lê o valor da variável do elemento :root (html)
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();
    
  return value || '#000000';
};