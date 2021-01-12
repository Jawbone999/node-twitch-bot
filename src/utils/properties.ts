const configsPath = "../../configs";

/**
 * Properties stores data from the application config files.
 */
class Properties {
  externalServices: any;

  logging: any;

  bot: any;

  custom: any;

  replies: any;

  timedMessages: any;

  /**
   * Fetch and store all data from config files.
   */
  constructor() {
    this.setProperties();
  }

  setProperties() {
    this.externalServices = require(`${configsPath}/externalServices.json`);
    this.logging = require(`${configsPath}/loggingConfig.json`);
    this.bot = require(`${configsPath}/botConfig.json`);
    this.custom = require(`${configsPath}/customCommands.json`);
    this.replies = require(`${configsPath}/replies.json`);
    this.timedMessages = require(`${configsPath}/timedMessages.json`);
  }
}

export const properties = new Properties();
