// TODO: there should be a single collection of format methods
const utez = 1000000;

export function utezToTez(amount: number): number {
    return amount / utez;
}

export function formatAmount(amount: number, decimal: number = 3) {
    return utezToTez(amount).toFixed(decimal);
}
