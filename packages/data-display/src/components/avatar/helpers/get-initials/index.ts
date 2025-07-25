function getInitials(userName?: string | string[]) {
  if (!userName) {
    return null;
  }

  const names = Array.isArray(userName) ? userName : (userName?.split(' ') ?? []);

  return names.map((name) => name?.[0]?.toUpperCase() ?? '').join('');
}

export default getInitials;
