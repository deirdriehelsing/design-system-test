function getBaseDomain() {
  return `https://itemsearch.${
    window.location.host.includes('varsitytutors') ? 'varsitytutors' : 'vtstaging'
  }.com`;
}

export default getBaseDomain;
