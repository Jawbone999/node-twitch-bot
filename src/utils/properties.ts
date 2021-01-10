const configsPath = "../../configs";

/**
 * Properties stores data from the application config files.
 */
class Properties {
  externalServices: any;

  logging: any;

  bot: any;

  /**
   * Fetch and store all data from config files.
   */
  constructor() {
    this.externalServices = require(`${configsPath}/externalServices.json`);
    this.logging = require(`${configsPath}/loggingConfig.json`);
    this.bot = require(`${configsPath}/botConfig.json`);
  }
}

export const properties = new Properties();
