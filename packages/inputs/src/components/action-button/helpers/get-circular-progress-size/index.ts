function getCircularProgressSize(size: string) {
  switch (size) {
    case 'small':
      return 20;
    case 'large':
      return 28;
    default:
      return 24;
  }
}

export default getCircularProgressSize;
