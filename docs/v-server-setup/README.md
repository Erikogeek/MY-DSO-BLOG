# My V-Server Setup
In this project, we want to set up a virtual Server. A server is a machine which provide many services to other machines. It manages other machines. Hier below, we will give you all steps to configure this virtual server.
# Setup Guide
This guide documents the initial setup of an Ubuntu virtual machine which we use hier as server. It  will contains the phase of creation of SSH key authentication, disabling password-based SSH login, installing and configuring Nginx on port `8081`, configuring Git, and connecting the server to GitHub via SSH.

## Table of Contents

- [1. Creating of SSH Key on the server](#1-creating-of-SSH-Key-on-the-server)
- [2. Deposit and Test the Public Key](#2-Deposit-and-test-the-public-key)
- [3. Disable Password-Based SSH Authentication](#3-disable-password-based-ssh-authentication)
- [4. Install Nginx](#4-install-nginx)
- [5. Creating own Website using Nginx](#5-creating-own-Website-using-Nginx)
- [6. Configure Nginx using Port 8081](#6-configure-nginx-using-port-8081)
- [7. Enable and Test the Nginx Site](#7-enable-and-test-the-nginx-site)
- [8. Configure Git on the Server](#8-configure-git-on-the-server)
- [9. Connect the Server to GitHub](#9-connect-the-server-to-github)
- [10. Create and Clone the Repository](#10-create-and-clone-the-repository)

The examples use the following values:

| Setting           | Value                   |
| ----------------- | ----------------------- |
| Server IP address | `2.28.55.49`          |
| Nginx port        | `8081`                  |
| GitHub repository | `Erikogeek/v-server-setup` |

## 1. Creating of SSH Key

Create an SSH key pair that will be used exclusively for this server:

```
$ ssh-keygen -t ed25519 -C "your-email@example.com"
```

- `ssh-keygen` is a programm to create SSH-Key pair.
- `-t` this letter define the `Typ (ed25519)` of key. ` ed25519` is a modern, secured and compact typ of keys.
- `C`add a commentar to the created key. In this place, the commentar is the emailadresse.

Enter a strong passphrase if you want else you can let empty.
To verify the creating of SSH-key pair and where the file was saved, you can use this command:
```
$ C:\Users\username\.ssh\id_ed25519
```

Two files were created: 
- `~/.ssh/id_ed25519_server` — the private key; never share it.
- `~/.ssh/id_ed25519_server.pub` — the public key that will be installed on the server for connecting.

## 2. Install and Test the Public Key

Run the following command on the client (server) to add the public key to the server user's `authorized_keys` file:

```
$ ssh-copy-id -i ~/.ssh/id_ed25519_server.pub <server-user>@<server-ip>
```

On the server, confirm that the public key was added:

```
$ cat /home/username/.ssh/authorized_keys
```
You will see how many public-keys are saved. You recognize your key with the help of your emailadresse or your username in your local machine.

Connect to the server your SSH-Key:

```
$ ssh username@IP-adresse your server.
```
oder use:

```
ssh -i ~/.ssh/id_ed25519_server <server-user>@<server-ip>
```



## 3. Disable Password-Based SSH Authentication

> [!CAUTION]
> Keep the current SSH session open and verify key-based login in a second terminal before disabling password authentication. Otherwise, an incorrect configuration could lock you out of the server.

Open the configuration file of SSH in your virtual machine. You can use this command:

```
$ sudo nano /etc/ssh/sshd_config
```

Set the following directive, adding it if necessary:

```text
PasswordAuthentication no
```

Validate the SSH configuration before restarting the service:

```
$ sudo sshd -t
```

If the command produces no output, restart SSH:

```
$ sudo systemctl restart ssh.service
```

Open a second client terminal and verify that key-based authentication still works:

```
$ ssh username@IP-adresse of your virtual machine.
```

Then test that authentication without a public key is rejected:

```
$ ssh -o PubkeyAuthentication=no <server-user>@<server-ip>
```

The connection should fail with a message similar to:

```
'Permission denied (publickey).'
```

## 4. Install Nginx

Connect to the server again:

```
$ ssh username@IP-adresse you server
```

Update the package index and installed packages: 
- `Sudo` is a super user with all rights.
- `apt` : `Advanced Package Tool` is a package manager of debian.

```
$ sudo apt update
$ sudo apt upgrade
```

Install Nginx:

```
$ sudo apt install nginx
```

Check the service status:

```
$ systemctl status nginx.service
```

The status should show `active (running)`. Press `q` to leave the status view.

## 5. Creating own Website using Nginx

Create the document root:

```
$ sudo mkdir -p /var/www/alternatives
```

Create the site's HTML file:

```
$ sudo nano /var/www/alternatives/alternate-index.html
```

Add the following content:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Hello, Nginx!</title>
  </head>
  <body>
    <h1>Hello, Nginx!</h1>
    <p>I have configured the Nginx web server on Ubuntu Server.</p>
  </body>
</html>
```

## 6. Configure Nginx Using Port 8081

Create a new Nginx server block:

```
$ sudo nano /etc/nginx/sites-enabled/alternatives
```

Add this configuration:

```
server {
    listen 8081 ;
    listen [::]:8081 ;

    server_name _;

    root /var/www/alternatives;
    index alternate-index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

This configuration makes the custom site the default Nginx site on port `8081`. The `server_name _;` value is a conventional catch-all name; `default_server` provides the actual fallback behavior for this port.

## 7. Enable and Test the Nginx Site

Disable the original Nginx default site:

```
$ sudo unlink /etc/nginx/sites-enabled/alternatives
```

Enable the new site by creating a symbolic link:

```
$ sudo ln -s  /etc/nginx/sites-enabled/alternatives
```

Test the Nginx configuration:

```
$ sudo nginx -t
```

Only reload Nginx if the configuration test succeeds:

```
$ sudo systemctl reload nginx
```

Test the site locally on the server:

```
curl http://2.28.55.49:8081
```

## 8. Configure Git on the Server

Set the name and email address used for commits:

```
$ git config --global user.name "Your Name"
$ git config --global user.email "you@example.com"
```

Review the global Git configuration:

```
$ git config --global --list
```

## 9. Connect the Server to GitHub

Create a dedicated SSH key pair on the server for GitHub:

```
$ ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519 -C "your email adresse"
```

Display the public key:

```
$ cat ~/.ssh/id_ed25519.pub
```

Copy the complete output and add it to GitHub.

Create or edit the SSH client configuration on the server:

```
nano ~/.ssh/config
```

Add the following entry:

```sshconfig
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519
    IdentitiesOnly yes
```

Apply restrictive permissions:

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/config
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
```

Test GitHub authentication:

```
ssh -T git@github.com
```

## 10. Create and Clone the Repository

Create a feature branch on the main branch your MY-DSO-BLOG named `V-Server-Setup` and initialize it with a README.

Documentation changes should be made in a dedicated branch. A suitable branch name is:

```
docs/v-server-setup/README.md
```

Create a directory for repositories on the server and clone the project:

```
mkdir -p ~/repos
cd ~/repos
git clone git@github.com:Erikogeek/v-server-setup.git
cd v-server-setup
```

Create the documentation branch:

```
$ git switch -c docs/v-server-setup
```

After editing `README.md`, commit and publish the branch:

```
git add README.md
git commit -m "docs: "commit informations"
git push -u origin docs/v-server-Setup
```


A V-Server set up an serves an alternatives HTML page via Nginx.
## Objectives