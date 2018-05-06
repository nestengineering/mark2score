import UAParser from 'ua-parser-js';
import SENTRY_URL from './configs/sentry';
import GA_ID from './configs/ga';

const parser = new UAParser();
const osName = parser.getOS().name;

const rgb = {
  RED: '255, 99, 132',
  YELLOW: '255, 205, 86',
  GREEN: '75, 192, 192',
  BLUE: '54, 162, 235',
  PURPLE: '153, 102, 255',
  GREY: '201, 203, 207',
};
export default {
  RELEASE: '0.0.0-beta',
  TITLE: 'Mark2score',
  EMAIL: 'info@mark2score.com',
  SUPPORTEDBROWSERS: ['Chrome'],
  METAKEY: osName === 'Mac OS' ? '⌘' : 'ctrl',
  URL: 'https://mark2score.com',
  DEVURL1: 'http://localhost:3000',
  DEVURL2: 'http://192.168.0.104:3000', // lanの別端末で検証を行う場合に必要。
  GA_ID,
  SENTRY_URL,
  CHROME_DL_URL: 'https://www.google.co.jp/chrome/',
  CONTACT_URL: 'https://docs.google.com/forms/u/0/',
  REPOSITORY_URL: 'https://github.com/hand-dot/mark2score',
  ROADMAP_URL: 'https://trello.com/',
  BLOG_URL: 'https://medium.com/',
  COMMUNITY_URL: 'https://join.slack.com/',
  APPWIDTH: window.innerWidth < 1280 ? window.innerWidth : 1280,
  APPHEIGHT: window.innerHeight,
  authType: {
    GOOGLE: 'google',
    EMAIL_AND_PASSWORD: 'emailAndPassword',
  },
  loginProviderId: {
    PASSWORD: 'password',
    GOOGLE: 'google.com',
  },
  menuItemKey: {
    CONTACT: 'contact',
    GIT: 'git',
    ROADMAP: 'roadmap',
    BLOG: 'blog',
    COMMUNITY: 'community',
  },
  brandColor: {
    base: {
      RED: `rgb(${rgb.RED})`,
      YELLOW: `rgb(${rgb.YELLOW})`,
      GREEN: `rgb(${rgb.GREEN})`,
      BLUE: `rgb(${rgb.BLUE})`,
      PURPLE: `rgb(${rgb.PURPLE})`,
      GREY: `rgb(${rgb.GREY})`,
    },
    light: {
      RED: `rgba(${rgb.RED},0.2)`,
      YELLOW: `rgba(${rgb.YELLOW},0.2)`,
      GREEN: `rgba(${rgb.GREEN},0.2)`,
      BLUE: `rgba(${rgb.BLUE},0.2)`,
      PURPLE: `rgba(${rgb.PURPLE},0.2)`,
      GREY: `rgba(${rgb.GREY},0.2)`,
    },
  },
};
