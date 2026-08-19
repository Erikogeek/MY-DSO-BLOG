# My Developer Blog

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Repository Description

This repository hosts a developer blog built with Docusaurus. It includes tools and scripts for creating, managing, and deploying static web content. The software supports rapid local development, customizable theming, and seamless deployment to platforms like GitHub Pages or NGINX.
## Steps of my Developper Blog
The project paket came from Developer Akademie and I copied it in my own repository named MY-DSO-BLOG.

1- clone my repository with my local computer. To do this, I need to creat a SSH-key using this command:
  ```
 ssh-keygen -t ed25519 -C "user_email_adresse"
   ```
- t describe the typ of Key
- ed25519 is a modern, secure and compact SSH-Key-typ
- C add to your key your email.

2- to check if the creating of SSH-Key was succes, Enter file in which to save the key

   ```
  $ C:\Users\username\.ssh\id_ed25519
   ```
you will find two files:
id_ed25519 ---> private Key
id_ed25519.pub --> Public-Key
It is more important to note that you never give your private-key. The public-key will be used for server or Github.
To show your public-Key, enter this command:

```
$ cat C: /user/username/.ssh/id_ed25519.pub
```
After this, the public-key can be set in Github. this will be save by SSH-Key in Github.

3- The project can be save from Github to the local computer and cloned with following command:

```
$ git clone git@github.com:Erikogeek/MY-DSO-BLOG.git
```

your keep the same folder name.
Open now your Visual studio Code and open the project folder.
With the command

```
§ code .
```
you can start the project.

## Creating of feature branch from main branch in Github named Setup-Blog.
 the first thing to do hier is to check in which branch your are.

 ```
 $ git branch
 ```
You will see something like :*main. this * shows that you are in actual branch.
Now you need to logout in the main branch and create the feature branch Setup_blog and stay there.

```
$ git checkout -b feature/Setup-Blog
```
Now is the feature branch created.

## Feature branch to Github load

```
$ git push -u origin feature/Setup-blog
```
The Github sees like this:
GitHub
├── main
└── feature/Setup-Blog
## Excetution of Modifications
In the visual studio code we can adapt modifications in our blog
After modification in our feature branch we use:

```
$ git status
```
To see all files our project that were modificated.
To execut the Modification in our local device we enter the following command:

```
$ git add <filename>
```
and then

```
$git commit -m "hier message of modifications"
```

Nun we enter 

```
$ git push
```
To push the modifications in Github.

## creation of Pull-request

Pull request is a demande on the Teams for checking. 
It connects the main branch and the feature branch.
After execution modifications we can use the button "Compare & Pull request" to create a new Pull request.
this means saving the modification from feature branch in main. Adding the description of request and clic of creation.





## Repository Structure

The repository is organized as follows:

- `blog/`: Contains markdown files for blog posts. Blog-related metadata is automatically picked up by the Docusaurus configuration.
- `docs/`: Contains markdown files for documentation. These files are referenced in `sidebars.ts` to define the sidebar structure.
- `src/`: Contains custom React components, CSS, and JavaScript for additional functionality or theming.
- `static/`: Stores static assets (e.g., images, icons) served directly without processing.
- `sidebars.ts`: Configures the structure of sidebars in the documentation section.
- `docusaurus.config.ts`: Main configuration file for customizing and managing Docusaurus behavior.
- `build/`: Generated after running the `pnpm build` command. Contains the static website files ready for deployment.

New content can be added as follows:

- Add new documentation files to the `docs/` folder.
- Add new blog posts to the `blog/` folder. No additional configuration is required.

## Deployment

### Deploy to Github Pages

To deploy using SSH:

```
$ USE_SSH=true pnpm deploy
```

To deploy without using SSH, run:

```
$ GIT_USER=<Your GitHub username> pnpm deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

### Deploying using NGINX

To deploy the site using NGINX and Docker, follow this [guide](./docs/guides/deploy-docusaurus-with-docker-and-nginx.md)
