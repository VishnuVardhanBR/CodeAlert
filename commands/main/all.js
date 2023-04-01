const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
	  .setName('allcontests')
	  .setDescription('Show all contests'),
	async execute(interaction) {
	  try {
		const response = await axios.get('https://kontests.net/api/v1/all');
		const contests = response.data;

		// Filter the contests based on the specified sites and within the next 7 days
		const filteredContests = contests.filter(c =>
		  ['LeetCode', 'CodeForces', 'CodeChef'].includes(c.site) &&
		  isWithinNextWeek(new Date(c.start_time))
		);

		// Build a string with the names and dates of the contests
		const contestInfo = filteredContests.map((c, i) => {
		  const startTime = new Date(c.start_time);
		  const startTimeIST = new Date(startTime.getTime());
		  const formattedDate = startTimeIST.toLocaleString('en-US', { timeZone: 'Asia/Kolkata', dateStyle: 'long', timeStyle: 'short' });
		  return `${i+1}. ${c.name} - ${formattedDate} IST\nLink: <${c.url}>\n\n`;
		}).join('');

		await interaction.reply(`**Upcoming contests for the this week:**\n\n${contestInfo}`);
	  } catch (error) {
		console.error(error);
		await interaction.reply('An error occurred while retrieving the contests.');
	  }
	},
  };



// function getMonday(date) {
//   const d = new Date(date);
//   const day = d.getDay();
//   const diff = d.getDate() - day + (day === 0 ? -6 : 1);
//   return new Date(d.setDate(diff));
// }

// function getSunday(date) {
//   const d = new Date(date);
//   const day = d.getDay();
//   const diff = d.getDate() - day + (day === 0 ? 0 : 7);
//   return new Date(d.setDate(diff));
// }

function isWithinNextWeek(date) {
	const today = new Date();
	const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
	return date >= today && date < nextWeek;

}
