const generatePassword = (length = 2) => {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    var possible = 'abcdefghijklmnopqrstuvwxyz'
    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    var possible = '@#$%&'
    for (var i = 0; i < 1; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    var possible = '0123456789'
    for (var i = 0; i < 3; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    return text
}

module.exports = {
    generatePassword,
}