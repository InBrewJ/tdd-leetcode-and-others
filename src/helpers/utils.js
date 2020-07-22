const adder = (a, b) => {
  return a + b
}

const HelloLBHer = () => {
  return 'Hey, LBH'
}

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

  let firstMaxIndex = 0
  let lastMaxIndex = 0
  let firstMaxValue = 0
  let lastMaxValue = 0
  let distanceBetween = 0
  let maxArea = 0
  const endIndex = height.length - 1

  height.forEach((h, i) => {
    // in-loop util for getting the current area
    const getArea = (lastIndex, firstIndex) => {
      distanceBetween = Math.clip(lastIndex - firstIndex, 0, height.length)
      return Math.min(height[lastIndex], height[firstIndex]) * distanceBetween
    }

    const consideredAreaIsBigger = (lmi, fmi) => {
      return getArea(lmi, fmi) > maxArea
    }

    // Really awkward bounds checking...
    if (i === 0) {
      firstMaxValue = h
      firstMaxIndex = 0
      lastMaxValue = height[1]
      lastMaxIndex = 1
    } else if (i === endIndex) {
      if (consideredAreaIsBigger(lastMaxIndex, firstMaxIndex)) {
        lastMaxValue = height[endIndex]
        lastMaxIndex = endIndex
      }
    }

    if (h > firstMaxValue) {
      firstMaxValue = h
      firstMaxIndex = i
    }

    if (consideredAreaIsBigger(lastMaxIndex, firstMaxIndex)) {
      maxArea = getArea(lastMaxIndex, firstMaxIndex)
      // console.log(`maxArea set to ${maxArea}`)
      // console.log(`firstMaxIndex ${firstMaxIndex}`)
      // console.log(`lastMaxIndex ${lastMaxIndex}`)
      // console.log(`height ${height}`)
    }
  })

  return maxArea
}

module.exports = {
  adder,
  HelloLBHer,
  maxArea
}
