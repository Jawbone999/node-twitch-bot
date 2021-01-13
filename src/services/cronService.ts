import { schedule } from "node-cron";
import { toString } from "cronstrue";
import { logger } from "../utils/logger";
import { properties } from "../utils/properties";
import { client } from "./twitchService";

export function startTimedMessages() {
  logger.info("Scheduling automated messages...");
  Object.keys(properties.timedMessages).forEach((t: any) => {
    schedule(properties.timedMessages[t].timer, () => {
      logger.info(`Scheduled message triggered: ${t}`);
      client.say(
        properties.timedMessages[t].channel,
        properties.timedMessages[t].message
      );
    });

    const interval = toString(properties.timedMessages[t].timer, {
      use24HourTimeFormat: true,
    });

    logger.info(`Scheduled '${t}': ${interval}.`);
  });
  logger.info("Scheduling messages completed.");
}

export function addTimedMessage(
  title: string,
  message: string,
  channel: string,
  timer: string
) {
  logger.info(`Scheduling new automated message: ${title}`);
  schedule(timer, () => {
    logger.info(`Scheduled message triggered: ${title}`);
    client.say(channel, message);
  });

  const interval = toString(timer, {
    use24HourTimeFormat: true,
  });

  logger.info(`Scheduled '${title}': ${interval}.`);

  return interval;
}
