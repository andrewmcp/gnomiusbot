module.exports = (client, member, speaking) => {
  if (!member.user.bot && member.voiceChannel.members.size > 2) {
    let channel = member.guild.channels.find(c => c.name.includes("general"));
    if (channel === null) return message.channel.send("There needs to be a text channel with general in the name for points to work.");
    if (speaking) {
      member.timestart = +new Date()
    }
    if (!speaking) {
      // var activationsperpoint = 2 ;
      // var balancefactor = Math.floor(Math.random() * (+activationsperpoint));
      // if (balancefactor > 0) return;
      member.timestop = +new Date()

      timedif = member.timestop - member.timestart

      if (timedif === undefined || isNaN(timedif) || timedif === null || timedif > 30000) return;

      const key = `${member.guild.id}-${member.id}`;

      //triggers for new users
      client.points.ensure(key, {
        user: member.id,
        guild: member.guild.id,
        points: 0,
        level: 1,
        gp: 0,
        maxgp: 0,
        credit: 0,
        pointboost: 0
      });

      //client.points.delete(`${message.guild.id}-173741422313209857`);
      let pointboost = client.points.get(key, "pointboost")

      let points = Math.floor((timedif * (pointboost + 1))/1000)

      //increment points
      client.points.math(key, "+", points, "points");
      client.points.math(key, "+", 10, "gp");

      // Calculate the user's current level
      const curLevel = Math.floor(0.1 * Math.sqrt(client.points.get(key, "points")));
      const curgp = client.points.get(key, "gp")

      // Act upon level up by sending a message and updating the user's level in enmap.
      if (client.points.get(key, "level") < curLevel) {
        channel.send(`${member} grew to LV.${curLevel}!`);
        client.points.set(key, curLevel, "level");
      }
      if (client.points.get(key, "maxgp") < curgp) {
        client.points.set(key, curgp, "maxgp");
      }
    }
  }
}
