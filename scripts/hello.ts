import hubot = require("hubot");

module.exports = (robot: hubot.Robot): void => {
  robot.respond(/hello/i, (msg: hubot.Response) => {
    msg.send("world");
  });
};
