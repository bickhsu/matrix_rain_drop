const canvas = document.getElementById("matrix")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

// Setting alphabet
const katakana = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
const english = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const numbers = "0123456789"
const alphabet = katakana + english + numbers
const fontSize = 16

// Calulate column counts and initialize rain drops list
const columns = canvas.width/fontSize
const rainDrops = Array.from({ length: columns }, () => 1)

const draw = () => {
    // Text fade out
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Font family and color
    ctx.fillStyle = "rgb(32, 148, 42)"
    ctx.font = fontSize + "px VT323"

    // For each column
    for (let i = 0; i < columns; i++) {
        // Random select char from alphabet and setting text
        const text = alphabet.charAt(Math.random() * alphabet.length | 0)
        const xPos = i * fontSize
        const yPos = rainDrops[i] * fontSize
        ctx.fillText(text, xPos, yPos)

        // Randomly resetting rain drop position
        if (yPos > canvas.height && Math.random() > 0.98) rainDrops[i] = 0

        rainDrops[i]++
    }
}

setInterval(draw, 30)

