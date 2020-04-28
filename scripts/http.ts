import hubot = require("hubot");

module.exports = (robot: hubot.Robot): void => {
  robot.router.post(/webhook/i, (req: any, res: any) => {
    console.log(req.body);
    res.end("OK");
  });
};
