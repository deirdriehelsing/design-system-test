interface GetFlagOverrideParams {
  flag: string;
  searchParams?: URLSearchParams;
}

function getFlagOverride({
  flag,
  searchParams = new URLSearchParams(window.location.search),
}: GetFlagOverrideParams): boolean | string | undefined {
  if (!searchParams.has(flag)) {
    return undefined;
  }

  const searchParamFlag = searchParams.get(flag) || '';

  switch (searchParamFlag) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return searchParamFlag;
  }
}

export default getFlagOverride;
