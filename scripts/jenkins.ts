import hubot = require("hubot");

function BuildJob(robot: hubot.Robot, job_name: string, token: string) {
    let base_url: string = process.env.JENKINS_URL;
    let url: string = `${base_url}/job/${job_name}/build?token=${token}`;
    let request = robot.http(url).get();
    console.info("Call Jenkins: " + url);
    request((error, response, get_body) => {
      console.info(error);
      console.info("Status: " + response.statusCode);
    });
}

function BuildJobWithParameters(robot: hubot.Robot, job_name: string, token: string) {
    let base_url: string = process.env.JENKINS_URL;
    let url: string = `${base_url}/job/${job_name}/buildWithParameters?token=${token}&param=hoge`;
    let request = robot.http(url).get();
    console.info("Call Jenkins: " + url);
    request((error, response, get_body) => {
      console.info(error);
      console.info("Status: " + response.statusCode);
    });
}

module.exports = (robot: hubot.Robot): void => {
  robot.respond(/hello/i, (msg: hubot.Response) => {
    msg.send("world");
    BuildJob(robot, "test", "token");
    BuildJobWithParameters(robot, "test2", "token");
  });
};
