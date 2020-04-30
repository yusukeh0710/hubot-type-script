import hubot = require("hubot");

function OpenPullRequest(robot: hubot.Robot, body: any): void {
    console.info("Open Pull Request");
}

function ClosePullRequest(robot: hubot.Robot, body: any): void {
    let merged: boolean = body.pull_request.merged;
    if (!merged) {
      console.info("Close Pull Request");
      return;
    }

    console.info("Merge Pull Request");
}

function CreateComment(robot: hubot.Robot, body: any): void {
    let comment: string = body.comment.body;
    console.info(`New Comment: ${comment}.`);
}

module.exports = (robot: hubot.Robot): void => {
    robot.router.post("/hubot/gitbucket", (req, res) => {
        // console.info(req.body);
        let body = req.body
        if (body) {
            let action : string = body.action

            switch (action) {
                case "opened":
                case "reopened":
                    OpenPullRequest(robot, body);
                    break;
                case "closed":
                    ClosePullRequest(robot, body);
                    break;
                case "created":
                    CreateComment(robot, body);
                    break;
                case undefined:
                    break;
                default:
                    console.info(`unknown action: ${action}`);
                    break;
            }
        }
        res.status(200).end("OK");
    });
};
