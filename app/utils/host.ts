export const getHost = () => {
  const host =
    process?.env?.NODE_ENV !== 'development'
      ? process?.env?.NEXT_PUBLIC_PRODUCTION_HOST
      : process?.env?.NEXT_PUBLIC_DEVELOP_HOST;

  return host;
};
