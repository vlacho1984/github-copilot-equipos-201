// Porcentaje de ocupación de un evento, entero de 0 a 100.
// sold: entradas válidas; capacity: aforo del recinto. Si capacity es 0, devuelve 0.
export function calculateOccupancy(sold: number, capacity: number): number {
  if (capacity === 0) {
    return 0;
  }
  return Math.round((sold / capacity) * 100);
}