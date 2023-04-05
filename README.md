# CodeAlert

A Discord bot that retrieves a list of coding contests from an API and displays them in Discord channels using slash commands.

## Usage

To use the bot, invite it to your Discord server using this [link](https://discord.com/api/oauth2/authorize?client_id=1091688367109967992&permissions=2147483648&scope=bot
):

The bot supports the following slash commands:

#### /mondaytosunday

Lists all contests in the current week (Monday to Sunday).

#### /24h

Lists all the contests within 24 hours.

#### /7days

Lists all the contests within this week.


## Installation
#### Prerequisites
To host and run the bot yourself, you'll need the following:
- [Node.js](https://nodejs.org/)
- A Discord account
- A Discord bot and its token. Follow the [Discord.js](https://discordjs.guide/preparations/setting-up-a-bot-application.html) guide to learn how to create a bot and obtain its token.


To host the bot yourself, follow these steps:

1.  Download the latest [release](https://github.com/VishnuVardhanBR/CodeAlert/releases) of the bot from the GitHub repository.
    
2.  Extract the contents of the release archive to a directory on your machine.
    
3.  Create a `config.json` file in the root directory of the project and replace `YOUR_TOKEN` with your Discord bot token and `BOT_ID` with your Discord bot's client ID:
    
```ts
{
	"token": "YOUR_TOKEN",
	"clientId": "BOT_ID"
}
```

4.  Install the required dependencies.

```bash
npm install
```

5.  Start the bot.
```bash
node index.js
```

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/VishnuVardhanBR/CodeAlert/blob/main/LICENSE) file for details.
