export const fetchUserInfo = async url => {
    const response = await fetch(url)
    const parsedResponse = await response.json();
    return {response, parsedResponse};
};

export const fetchUserRepos = async (url, page) => {
    const response = await fetch(`${url}?page=${page}`);
    const parsedResponse = await response.json();
    return {response, parsedResponse};
};