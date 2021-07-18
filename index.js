const img = document.querySelector('img')
const inputs = document.querySelectorAll('.filters input')
const resetButton = document.querySelector('.btn-reset')
const nextImg = document.querySelector('.btn-next')
const uploadImg = document.querySelector('.btn-load--input')
const saveImg = document.querySelector('.btn-save')
const fullScreenButton = document.querySelector('.fullscreen')
let counter = 1

function updateFilters() {
  inputs.forEach((item) => {
    item.nextElementSibling.value = item.value + item.dataset.sizing
    item.addEventListener('input', () => {
      item.nextElementSibling.value = item.value + item.dataset.sizing
      img.style.setProperty(`--${item.name}`, item.value + item.dataset.sizing)
    })
  })
}

function resetFilters() {
  inputs.forEach((item) => {
    item.value = item.defaultValue
    item.nextElementSibling.value = item.value + item.dataset.sizing
    img.style.setProperty(`--${item.name}`, item.value + item.dataset.sizing)
  })
}

function saveImage() {
  const canvas = document.createElement('canvas')
  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight
  const size = img.naturalHeight / img.height
  const ctx = canvas.getContext('2d')
  ctx.filter = getComputedStyle(img).filter.replace(
    /\d+/,
    (blur) => blur * size
  )
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  const link = document.createElement('a')
  link.download = 'download.png'
  link.href = canvas.toDataURL('image/png')
  link.click()
  link.delete
}

function uploadImage() {
  const file = uploadImg.files[0]
  const reader = new FileReader()
  reader.onload = () => {
    const newImg = new Image()
    newImg.src = reader.result
    img.src = newImg.src
  }
  reader.readAsDataURL(file)
  uploadImg.value = ''
}

function getTimeOfDay() {
  const date = new Date()
  const hour = date.getHours()
  let timeOfDay = ''
  if (hour >= 6 && hour < 12) timeOfDay = 'morning'
  else if (hour >= 12 && hour < 18) timeOfDay = 'day'
  else if (hour >= 18 && hour <= 23) timeOfDay = 'evening'
  else if (hour >= 0 && hour < 6) timeOfDay = 'night'
  return timeOfDay
}

function handleNexImage() {
  counter = counter < 10 ? `0${counter}` : counter
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${counter}.jpg`
  counter === 20 ? (counter = 1) : counter++
}

function toggleFullScreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen()
  else document.exitFullscreen()
}

updateFilters()
uploadImg.addEventListener('change', uploadImage)
nextImg.addEventListener('click', handleNexImage)
resetButton.addEventListener('click', resetFilters)
fullScreenButton.addEventListener('click', toggleFullScreen)
saveImg.addEventListener('click', saveImage)
