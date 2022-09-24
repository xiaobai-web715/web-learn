const fortuneCookies = [
    "not found page",
    "lostConnection"
]

module.exports = getForture = () => {
    return fortuneCookies[Math.floor(Math.random() * fortuneCookies.length)];
}