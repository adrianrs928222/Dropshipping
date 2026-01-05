export function eur(cents: number) {
  return (cents / 100).toFixed(2).replace(".", ",") + " €";
}