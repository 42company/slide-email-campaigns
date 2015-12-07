SLIDE-Email-Campaigns
=========

Mailer for Slide project.

## Prerequisites

  - NodeJS

## Installation

```
gem install foreman
```

```
npm install
```

Add .env file:

```
AWS_ACCESS_KEY_ID=<Your AWS Access Key ID>
AWS_REGION=<Your AWS REGION>
AWS_SECRET_ACCESS_KEY=<Your AWS Secret Access Key>
S3_BUCKET=<Your S3 bucket>
SENDPULSE_USERNAME=<Your Sendpulse username>
SENDPULSE_PASSWORD=<Your Sendpulse password>
```

## Usage

Start processes using foreman:

```
foreman run gulp nodemon
```

To send Email

You can use csv address list.
**csv file must have email header.**
**example**
```
name,email
one,one@42.company
two,two@42.company
```

```
foreman run gulp send
```

## TODO

Get csv, email template file as parameter.
