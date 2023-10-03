function path(root: string, subLink: string) {
  return `${root}${subLink}`;
}
const ROOT_AUTH = '/';
const ROOT_MAIN = '/main';
const ROOT_PROFILE = '/main/profile';
const ROOT_HOME = '/main/dashboard';

export const PATH_AUTH = {
  root: ROOT_AUTH,
  login: path(ROOT_AUTH, 'login'),
  hallOfFame: path(ROOT_AUTH, 'hall-of-fame'),
  aboutUs: path(ROOT_AUTH, '/about-us'),
  hallofFameReward: path(ROOT_AUTH, '/hall-of-fame-reward'),
};

export const PATH_DASHBOARD = {
  dashboard: ROOT_HOME,
  saved: path(ROOT_MAIN, '/saved'),
  create: path(ROOT_MAIN, '/create-blog'),
  notification: path(ROOT_MAIN, '/notification'),
  aboutUs: path(ROOT_MAIN, '/about-us'),
  profile: path(ROOT_MAIN, '/profile'),
};

export const PATH_PROFILE = {
  edit: path(ROOT_PROFILE, '/edit'),
};
