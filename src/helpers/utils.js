Math.clip = function (number, min, max) {
  return Math.max(min, Math.min(number, max))
}

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  // In general, need to:
  // Get highest heights
  // But !!also!! maximise the distance between heights
  // to, at the end, maximise the area

  // Find first max in the array
  // From ltr, find the next max

  const endIndex = height.length
  let areas = []

  const getArea = (left, right) => {
    const distanceBetween = right - left
    return Math.min(height[left], height[right]) * distanceBetween
  }

  // const getArea = (lastIndex, firstIndex) => {
  //   distanceBetween = Math.clip(lastIndex - firstIndex, 0, endIndex)
  //   return Math.min(height[lastIndex], height[firstIndex]) * distanceBetween
  // }

  for (let l = 0; l < endIndex; l++) {
    for (let r = l + 1; r < endIndex; r++) {
      areas.push(getArea(l, r))
    }
  }

  console.log('areas :: ', areas)

  return Math.max(...areas)
}

module.exports = {
  maxArea
}
