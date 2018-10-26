const logReaderService = require('./log-reader.service');

function setupRoutes(router) {
  router.get('/logs/last-5-minutes', fetchLast5MinutesOfLog);
}

async function fetchLast5MinutesOfLog(ctx) {
  ctx.body = await logReaderService.fetchLast5MinutesOfLog();
  ctx.status = 200;
}

module.exports = {
  setupRoutes
};