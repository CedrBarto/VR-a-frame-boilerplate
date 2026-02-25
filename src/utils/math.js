/**
 * Returns a random float between min (inclusive) and max (exclusive).
 */
export function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}
