const getCurrentUrl = (uri) => {
    return uri.path.substring(0, uri.path.replace('/:', '').lastIndexOf('/'));
}

export {
    getCurrentUrl,
};
