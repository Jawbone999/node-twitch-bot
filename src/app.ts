import { logger } from "./utils/logger";
import { client, prefix } from "./services/twitchService";

client.on("message", (channel, tags, message, self) => {
  if (self || !message.startsWith(prefix)) return;

  const args = message.split(" ");
  const command = args[0].slice(1).toLowerCase();
  const params = args.slice(1);
});
