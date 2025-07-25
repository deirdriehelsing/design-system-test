function clearUrlStorage() {
  window.localStorage.removeItem('analytics-previous-url');
  window.localStorage.removeItem('analytics-current-url');
}

export default clearUrlStorage;
