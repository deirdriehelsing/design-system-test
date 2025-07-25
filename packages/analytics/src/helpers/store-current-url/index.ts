function storeCurrentUrl(url: string) {
  const previousUrl = window.localStorage.getItem('analytics-current-url') ?? '';

  window.localStorage.setItem('analytics-previous-url', previousUrl);
  window.localStorage.setItem('analytics-current-url', url);
}

export default storeCurrentUrl;
