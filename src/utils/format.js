/**
 * Función utilitaria para formatear números a formato de pesos chilenos (CLP)
 * Convierte un número en un string con formato de moneda chilena
 * Ejemplo: 59990 → "$59.990"
 * 
 * @param {number} price - Precio numérico a formatear
 * @returns {string} Precio formateado como string con símbolo $ y separadores de miles
 */
export const formatCLP = (price) => {
  /**
   * Intl.NumberFormat: API nativa de JavaScript para formateo de números internacionalizado
   * 
   * Parámetros:
   * - 'es-CL': locale de español de Chile (define formato regional)
   * - Objeto de configuración:
   *   * style: 'currency' - formatea como moneda
   *   * currency: 'CLP' - código ISO 4217 del peso chileno
   *   * minimumFractionDigits: 0 - sin decimales (pesos no usan centavos)
   * 
   * .format(price): aplica el formato al número proporcionado
   * 
   * Resultado: agrega símbolo $, separador de miles (punto), y formatea según región
   */
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
  }).format(price);
};
