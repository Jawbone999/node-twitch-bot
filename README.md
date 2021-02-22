# Node Twitch Bot

## How to run
### Live Development
1. `npm install`
2. `npm run watch`

### Production Deployment
1. `npm install`
2. `npm run build`
3. `npm run start`

## Configuration
In order to run the bot, you must fill out the `botConfig.json` file.

| Property | Description |
| --- | --- |
| username | The bot's username |
| prefix | The prefix to use for bot commands |
| token | The secret bot OAuth token |
| channels | Channels to connect the bot to |
| secretUsers | An array of usernames for users who are trusted to run any bot commands |