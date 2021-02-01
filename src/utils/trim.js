const trim = function (text, length=30) {
    return text.length > length
        ? `${text.substr(0, 30).trim()}...`
        : text
}

export default trim;
