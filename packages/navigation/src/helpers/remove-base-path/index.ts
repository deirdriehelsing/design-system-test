function removeBasePath(path: string, basePath: string) {
  const regex = new RegExp(`^(/)?${basePath}(/)?`);
  const finalPath = path.replace(regex, '/');

  return finalPath;
}

export default removeBasePath;
