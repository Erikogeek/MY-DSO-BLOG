import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { config as dotenvconfig } from "dotenv";

dotenvconfig();

/* TODO: change to read configuration from environment */
const blogEnabled = Boolean(process.env.BLOG_ENABLED === 'true')

const config: Config = {
  title: 'DSO For MY-DSO-BLOG',
  tagline: 'ERIKO-DevSecOps Enthusiast wiht a passion for Details and enfficiency',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: process.env.DEPLOYMENT_URL ?? "https://erikogeek.github.io" ,
  // "https://github.com/Erikogeek/MY-DSO-BLOG.git",
  //"https://spmse.github.io" 
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: process.env.BASE_URL ?? "MY-DSO-BLOG",
  // "/", //

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: process.env.Erikogeek, //GITHUB_ORG, // Usually your GitHub org/user name.
  projectName: process.env.GITHUB_PROJECT, // Usually your repo name.

  deploymentBranch: process.env.DEPLOYMENT_BRANCH,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Erikogeek/MY-DSO-BLOG.git',
        },
        blog: blogEnabled ?
          {
            showReadingTime: true,
            feedOptions: {
              type: ['rss', 'atom'],
              xslt: true,
            },
            // Please change this to your repo.
            // Remove this to remove the "edit this page" links.
            editUrl:
              'https://github.com/Erikogeek/MY-DSO-BLOG.git',
            // Useful options to enforce blogging best practices
            onInlineTags: 'warn',
            onInlineAuthors: 'warn',
            onUntruncatedBlogPosts: 'warn',
          }
          : false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'My Site',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/Erikogeek/MY-DSO-BLOG.git',
          label: 'Github',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/guides/intro',
            },
          ],
        },
        {
          title: 'Projects',
          items: [
            {
              label: 'MY-DSO-BLOG',
              href: 'https://github.com/Erikogeek/MY-DSO-BLOG.git',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/Erikogeek/MY-DSO-BLOG.git',
            },
            { label:'template',
              href: 'https://github.com/Erikogeek/MY-DSO-BLOG.git' ,

            }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Eric Fouedjio (Erikogeek). Built with Docusaurus and 💚.`,
      //copyright: `Copyright © ${new Date().getFullYear()} Developer Akademie (Developer-Akademie-DevSecOpsKurs). Built with Docusaurus and 💚.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['powershell', 'hcl'],
      magicComments: [
        // Remember to extend the default highlight class name as well!
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
        {
          className: 'code-block-error-line',
          line: 'This will error',
        },
      ],
    },
  } satisfies Preset.ThemeConfig,
};


if (blogEnabled) {
  (config.themeConfig.navbar as any).items.push({ to: '/blog', label: 'Blog', position: 'left' });
  (
    config.themeConfig.footer as any
  ).links[2].items.push({
    to: '/blog',
    label: 'Blog',
  });
} // test of Pullrequest.g

export default config;
