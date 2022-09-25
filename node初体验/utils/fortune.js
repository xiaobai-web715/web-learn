const fortuneCookies = [
  'not found page',
  'lost connection'
]

module.exports = () => {
  return fortuneCookies[Math.floor(Math.random() * fortuneCookies.length)]
}
