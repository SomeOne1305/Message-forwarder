## 🔗 Get Telegram Channel Link by Channel ID

Telegram does **not** provide a direct API to convert a channel ID into a link.  
You can get the link only in the following cases:

### 🌐 Public Channel

If the channel is public and has a username, the link is:

```
https://t.me/<username>
```

You can retrieve the username using:

```
chat = await ctx.telegram.getChat(channelId)
chat.username
```

### 🔒 Private Channel

If the channel is private, your bot **must be an admin** in that channel.  
Then you can generate an invite link:

```
await ctx.telegram.exportChatInviteLink(channelId)
```

```
BOT_TOKEN=""
CHANEL_ID=""
```

### 🚫 Impossible Case

If the channel is private and the bot is **not an admin**, Telegram does **not** allow getting the link.  
There is no workaround.

### 📌 Summary

- 🌐 Public channel → link available via username
- 🔑 Private channel + bot admin → invite link can be generated
- 🚫 Private channel + bot NOT admin → link cannot be retrieved
