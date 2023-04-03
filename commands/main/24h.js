const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");
const { isWithin24Hours } = require("../../lib/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("24h")
    .setDescription("Show all contests within 24 hours"),
  async execute(interaction) {
    try {
      const response = await axios.get("https://kontests.net/api/v1/all");
      const contests = response.data;

      const filteredContests = contests.filter(
        (c) =>
          (["LeetCode", "CodeForces"].includes(c.site) ||
            (c.site == "CodeChef" && c.url.includes("START"))) &&
          isWithin24Hours(c.in_24_hours)
      );

      const contestInfo = filteredContests
        .map((c, i) => {
          const startTime = new Date(c.start_time);
          const startTimeIST = new Date(startTime.getTime());
          const formattedDate = startTimeIST.toLocaleString("en-US", {
            timeZone: "Asia/Kolkata",
            dateStyle: "long",
            timeStyle: "short",
          });
          return `${i + 1}. ${c.name} - ${formattedDate} IST\n    Link: <${
            c.url
          }>\n\n`;
        })
        .join("");

      await interaction.reply(
        `**Contests within 24 hours:**\n\n${contestInfo}`
      );
    } catch (error) {
      console.error(error);
      await interaction.reply(
        "An error occurred while retrieving the contests."
      );
    }
  },
};
