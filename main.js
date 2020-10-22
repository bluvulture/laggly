import { logJiraIssue } from './logger.js';
import { issuesFromTextFile } from './fileParser.js';

const mainLog = async () => {
  const issues = await issuesFromTextFile();
  logJiraIssue(issues);
};

mainLog();

export default mainLog;
