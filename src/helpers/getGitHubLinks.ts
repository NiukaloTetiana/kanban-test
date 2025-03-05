export const getGitHubLinks = (url: string) => {
  const newURL = new URL(url);

  const path = newURL.pathname;

  const pathParts = path.split("/");

  const username = pathParts[1];
  const repository = pathParts[2];

  const repoUrl = `https://github.com/${username}/${repository}`;
  const userUrl = `https://github.com/${username}`;

  return { repoUrl, userUrl };
};
