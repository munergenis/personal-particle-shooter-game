// HELPER FUNCTIONS

/**
 * Generates a random number within a specified range.
 * 
 * @param {number} num1 - The minimum value of the range.
 * @param {number} num2 - The maximum value of the range.
 * @param {boolean} [isInt=false] - If true, returns an integer; otherwise, returns a float.
 * @returns {number} A random number in the range between `num1` and `num2`. Returns an integer if `isInt` is true, otherwise a float.
 */
export function getRandomInRange(num1, num2, isInt = false) {
  const randomFloat = Math.random() * (num2 - num1) + num1
  const randomInt = Math.floor(randomFloat)

  return isInt ? randomInt : randomFloat
}

/**
 * Returns the input number with a random sign (positive or negative).
 * (If input is 0, always returns 0)
 * 
 * @param {number} num - The input number whose sign will be randomized.
 * @returns {number} The input number with a randomly assigned sign: either positive or negative.
 */
export function randomSign(num) {
  const invertedNum = num === 0 ? 0 : num * -1
  
  return Math.random() < 0.5 ? invertedNum : num
}

/**
 * Calculates the distance between the centers of two circles or the distance between their borders.
 * 
 * This function computes either the distance between the centers of two circles or the distance between their edges,
 * depending on the value of the `distFromCenters` parameter. If `distFromCenters` is true, it returns the distance
 * between the centers of the circles. Otherwise, it returns the distance between the borders of the circles.
 * 
 * @param {Object} circle1 - The first circle.
 * @param {Object} circle1.position - The position of the first circle.
 * @param {number} circle1.position.x - The x-coordinate of the first circle's center.
 * @param {number} circle1.position.y - The y-coordinate of the first circle's center.
 * @param {number} circle1.radius - The radius of the first circle.
 * @param {Object} circle2 - The second circle.
 * @param {Object} circle2.position - The position of the second circle.
 * @param {number} circle2.position.x - The x-coordinate of the second circle's center.
 * @param {number} circle2.position.y - The y-coordinate of the second circle's center.
 * @param {number} circle2.radius - The radius of the second circle.
 * @param {boolean} [distFromCenters=false] - If true, returns the distance between the centers of the circles; otherwise, returns the distance between their borders.
 * @returns {number} The distance between the centers of the two circles if `distFromCenters` is true; otherwise, the distance between their borders.
 */
export function getDistanceBetweenCircles(circle1, circle2, distFromCenters = false) {
  const dx = circle1.position.x - circle2.position.x
  const dy = circle1.position.y - circle2.position.y

  const centersDistance = Math.hypot(dx, dy)
  const bordersDistance = centersDistance - (circle1.radius + circle2.radius)

  return distFromCenters ? centersDistance : bordersDistance
}

export function randomBool() {
  return Math.random() < 0.5
}