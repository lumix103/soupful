# Soupful

Soupful is a Discord bot based on my previous bot called [soup-kitchen](https://github.com/lumix103/soup-kitchen).

I've deciced to rewrite a new bot instead of updating my old bot
because after 4 years the discordjs framework has gone through many
changes. So I've decided it will be easier to make a new bot rather than fixing the entire bot.

## Commands

- Ban
  - Bans a user if possible.
- Kick
  - Kicks a user if possible.
- Ping
  - Replies with "pong!"

## TODO

- Experience/Point System

  - Reward players with experience/points for their activity on the server

- Status Command

  - A command that returns an image showing the user's experience/points.

- Prune Command

  - Kicks all non-active users from a server

- Web Interface

  - A website to customize settings or view bot status

## Installation

First clone the github repository and move into the directory

```bash
git clone https://github.com/lumix103/soupful.git
cd soupful
```

Afterwards create a .env file or edit your system variables to include
your bot's token under the variable called `BOT_TOKEN`

```bash
npm install
npm start
```
