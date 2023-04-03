const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");
const { getMonday, getSunday, isThisWeek } = require("../../lib/functions.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("mondaytosunday")
    .setDescription("Show contests from this Monday to Sunday"),
  async execute(interaction) {
    try {
      const response = await axios.get("https://kontests.net/api/v1/all");
      const contests = response.data;

      // Filter the contests based on the specified sites and only for this week
      const filteredContests = contests.filter(
        (c) =>
          (["LeetCode", "CodeForces"].includes(c.site) ||
            (c.site == "CodeChef" && c.url.includes("START"))) &&
          isThisWeek(new Date(c.start_time))
      );

      if (filteredContests.length === 0) {
        await interaction.reply(
          "There are no contests for this week that satisfy the specified conditions."
        );
        return;
      }

      // Build a string with the names and dates of the contests
      const contestInfo = filteredContests
        .map((c, i) => {
          const startTime = new Date(c.start_time);
          const startTimeIST = new Date(startTime.getTime());
          const formattedDate = startTimeIST.toLocaleString("en-US", {
            timeZone: "Asia/Kolkata",
            dateStyle: "long",
            timeStyle: "short",
          });
          return `\n${i + 1}. ${c.name} - ${formattedDate} IST\n     Link: <${
            c.url
          }>`;
        })
        .join("\n");

      const monday = getMonday(new Date());
      const sunday = getSunday(new Date());
      const formattedMonday = monday.toLocaleDateString("en-US", {
        timeZone: "Asia/Kolkata",
        dateStyle: "long",
      });
      const formattedSunday = sunday.toLocaleDateString("en-US", {
        timeZone: "Asia/Kolkata",
        dateStyle: "long",
      });
      await interaction.reply(
        `**Upcoming contests for the week of ${formattedMonday} to ${formattedSunday}:**\n${contestInfo}\n`
      );
    } catch (error) {
      console.error(error);
      await interaction.reply(
        "An error occurred while retrieving the contests."
      );
    }
  },
};
