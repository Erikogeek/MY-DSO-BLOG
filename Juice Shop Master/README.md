# Juice Shop Master

The ``Juice Shop Master``is a `DevSecOps` training project documentation and provides three challenges from the
[OWASP Juice Shop](https://owasp.org/www-project-juice-shop/), a deliberately
vulnerable web application used for security education.

Every challenge was chosen per difficulty tier (2★, 3★, 3★), each covering a **different class ofvulnerability**. Every challenge was solved hands-on in a local lab and is
documented end to end — reconnaissance, exploitation, impact and mitigation —
with a short video walkthrough.

:::warning This project is strictly educational and research purposes only.
It was produced for training during a DevSecOps course. All attacks
were performed against a local OWASP Juice Shop instance in a personal VM. Never
apply these techniques to systems you are not authorized to test.
:::

## Table of Contents

- [1. The Challenges](#1-the-challenges)
- [2. Quickstart](#2-quickstart)
- [3. Security recomandations](#3-Security-recomandationst)
- [4. Conclusion](#conclusion)

## 1. The Challenges

| # | Challenge | Difficulty | Category | Technique | Documentation | Video |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Admin Registration | ⭐⭐ | Improper Input Validation | Mass Assignment | [Read](./2-20-Admin-Registration/README.md) | [Loom](https://www.loom.com/share/4d4812d6edad4d5288695d63b4bd10a2) |
| 2 | CAPTCHA Bypass| ⭐⭐⭐ | Broken Anti Automation | Replay Attack | [Read](./4_20-CAPTCHA-Bypass/README.md) | [Loom](https://www.loom.com/share/6477e64a711e45819162e20f524cf707) |
| 3 | Login Jim| ⭐⭐⭐ | Injection | SQL Injection | [Read](./3_15-Login-Jim/README.md) | [Loom](https://www.loom.com/share/53b0b3eb47344b759b20ea0143372fba) |

## 2. Quickstart

- Download and install VirtualBox
```bash
sudo apt update && sudo apt install -y virtualbox
``` 

- Create a virtual machine running Kali Linux and Setup the Juice Shop on this VM.
```bash
https://www.kali.org/get-kali/#kali-platforms
``` 

- Clone the Juice-Shop Repository
```bash
git clone https://github.com/juice-shop/juice-shop && cd juice-shop 
```

- Download and install Dependencies
```bash
sudo apt update && sudo apt install -y nodejs npm
```

- Install and start the Juice-Shop 
```bash
npm install && npm start
```

- Open Webbrowser and enter the Destination
```bash
http://127.0.0.1:3000 
``` 
- Check out the Juice-Shop and try to solve some challenges.

## 3. Security recomandations

The exercises highlighted the importance of:

1. Server-Side input Validation: Validate all user input, CAPTCHA solutions, and permission-related attributes exclusively on the server side.
2. Secure Role Management: Assign user roles and permissions exclusively on the server side. Never trust role or permission attributes submitted by clients.
3. Input Allowlisting: Use an allowlist of permitted registration properties to prevent unauthorized modification of user attributes.
4. One-Time CAPTCHA Usage: Ensure that each CAPTCHA token is uniquely bound to a user session and challenge and can only be used once.
5. Authorization Checks: Implement strict authorization checks for administrative functionality and sensitive operations.
6. Rate Limiting: Limit the number of feedback submissions within a defined time period to prevent automated mass submissions.
7. Logging and Monitoring: Detect and log unusual submission patterns and suspicious activities.
8. Parameterized SQL queries and secure authentication.

## 4. Conclusion

All three challenges were successfully completed in a controlled local lab environment.

This project provided practical experience in web application security testing, HTTP request analysis, vulnerability exploitation and security mitigation.

It demonstrates how common web application vulnerabilities can be identified, exploited and prevented as part of a DevSecOps security approach.

:::Note: All tests were conducted exclusively against a local OWASP Juice Shop instance for educational purposes.:::