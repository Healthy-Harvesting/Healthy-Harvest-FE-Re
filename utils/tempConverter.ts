export function kelvinToFahrenheit(kelvin: any) {
  /**
   * Convert Kelvin to Fahrenheit.
   *
   * @param {number} kelvin - Temperature in Kelvin
   * @returns {number} - Temperature in Fahrenheit
   */
  const fahrenheit = ((kelvin - 273.15) * 9) / 5 + 32;
  return fahrenheit;
}

export function kelvinToCelsius(kelvin: any) {
  /**
   * Convert Kelvin to Celsius.
   *
   * @param {number} kelvin - Temperature in Kelvin
   * @returns {number} - Temperature in Celsius
   */
  const celsius = kelvin - 273.15;
  return celsius;
}
