import hubot = require("hubot");
import request from 'sync-request';

function GetTicket(robot: hubot.Robot, issue_no: number) {
    let base_url: string = process.env.REDMINE_URL;
    let token: string = process.env.REDMINE_TOKEN;
    let url: string = `${base_url}/issues/${issue_no}.json?key=${token}`;
    
    console.info(url);
    let response = request("GET", url);
    return JSON.parse(response.getBody('utf8'));
}

function UpdateTicket(robot: hubot.Robot, issue_no: number) {
    let base_url: string = process.env.REDMINE_URL;
    let token: string = process.env.REDMINE_TOKEN;
    let url: string = `${base_url}/issues/${issue_no}.json?key=${token}`;
    let data = JSON.stringify({
        "issue": {"subject": "IF_YOU_NEED_TO_CHANGE_SUBJECT","notes": "UPDATE_MESSAGE" }
    });
    
    console.info(url);
    let header = {"Accept": "application/json", "Content-type": "application/json"};
    let req = robot.http(url).header('Content-Type', 'application/json').put(data);
    req((error, response, body) => {
       console.info(response.statusCode);
    });
}



module.exports = (robot: hubot.Robot): void => {
    robot.respond(/redmine/i, (msg: hubot.Response) => {
        let json = GetTicket(robot, 1);
        console.info(json);
        UpdateTicket(robot, 1);
    });
};
