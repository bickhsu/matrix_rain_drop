/**
 * Wraps each character of the original text in span tags.
 * @param {HTMLElement} element - DOM Element.
 * @param {string} className - Class name for the span tags.
 */
function spanifyText (element, className) {
  const originText = element.innerText
  const spannedText = originText
    .split("")
    .map(char => `<span class="${className}">${char}</span>`)
    .join("")

  element.innerHTML = spannedText
}

/**
 * 
 * @param {MouseEvent} event 
 * @param {animationOption} options
 */
function hoverTextAnimation (
  event, { charDelay = 50, charFreq = 200, randomCharRepeats = 2 }) {
    const targetElement = event.target.closest("p")

    if (targetElement.classList.contains("isAnimated")) return

    targetElement.classList.add("isAnimated")
    const chars = targetElement.querySelectorAll(".char")

    chars.forEach((char, index) => 
      createCharAnimation(char, index, { charDelay, charFreq, randomCharRepeats })
    )
    
    const totalDuration = chars.length * charDelay + charFreq * (randomCharRepeats + 1)
    setTimeout(() => targetElement.classList.remove("isAnimated"), totalDuration)
}

/**
 * 
 * @param {string} char 
 * @param {number} index 
 * @param {animationOption} options 
 */
function createCharAnimation (
  char, index, { charDelay, charFreq, randomCharRepeats }) {
  const randomUnicode = () => String.fromCharCode(33 + Math.random() * 94 | 0) 
  const originalChar = char.innerText
  const startTime = index * charDelay

  char.style.opacity = 0
  
  // First animation: make the char visible and set background color.
  setTimeout(() => {
    char.style.opacity = 1
    char.style.background = "var(--color)"
  }, charFreq - charDelay + startTime)

  // Replace the char with random symbols over multiple repeats.
  for (let i = 1; i <= randomCharRepeats; i++) {
    setTimeout(() => {
      if (i === 1) char.style.background = "transparent"
      char.innerText = randomUnicode()
    }, i * charFreq + startTime)
  }

  // Restore the original char after the animation finishes.
  const totalDuration = (randomCharRepeats + 1) * charFreq + startTime
  setTimeout(() => char.innerText = originalChar, totalDuration)
}


const pElements = document.querySelectorAll("p");

pElements.forEach((pElement) => {
  spanifyText(pElement, "char")
  pElement.addEventListener("mouseenter", (event) => 
    hoverTextAnimation(event, { charDelay: 50, charFreq: 200, randomCharRepeats: 5 })
  )
})

