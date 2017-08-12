const baseUrl = 'https://www.reddit.com/';
const jsonPostfix = '.json';
const subRedditsPostfix = 'reddits.json';

async function sendRequest(url, requestParams) {
  let response = await fetch(url, requestParams);
  let result;

  try {
    result = await response.json();
  } catch (e) {
    result = { error: e };
  }
  return result;
}

class RedditAPI {
  static async getFeed() {
    return sendRequest(`${baseUrl}${jsonPostfix}`);
  }

  static async fetchNextFeed(lastPostName) {
    return sendRequest(`${baseUrl}${jsonPostfix}?count=25&after=${lastPostName}`);
  }

  static async getComments(permalink) {
    return sendRequest(`${baseUrl}${permalink}${jsonPostfix}`);
  }

  static async getSubreddits() {
    return sendRequest(`${baseUrl}${subRedditsPostfix}`);
  }
}

export default RedditAPI;
