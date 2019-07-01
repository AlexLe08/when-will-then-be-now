function filterLogsByEnv(logs, env) {
  const filteredLogs = []

  logs.forEach((log) => {
    if (log.environment === env) {
      filteredLogs.push(log)
    }
  })

  return filteredLogs
}

function filterLogsOnDate(logs, dateFilter) {
  const filteredLogs = []
  let parsedDateFilter = new Date(dateFilter)
  // Reassign variable without hours, minutes, etc AND IN GMT first
  parsedDateFilter = new Date(parsedDateFilter.getUTCFullYear(), parsedDateFilter.getUTCMonth(), parsedDateFilter.getUTCDay(),0,0,0,0)
  logs.forEach((log) => {
    let timestampDate = new Date(log.timestamp)
    // Reassign here too to keep comparisons in a controlled standard
    timestampDate = new Date(timestampDate.getUTCFullYear(), timestampDate.getUTCMonth(), timestampDate.getUTCDay(),0,0,0,0)
    if (parsedDateFilter.toString() === timestampDate.toString()) {
      filteredLogs.push(log)
    }
  })

  return filteredLogs
}

module.exports.filterLogs = function (logs, env, dateFilter) {
  const envLogs = filterLogsByEnv(logs, env)

  if (dateFilter) {
    return filterLogsOnDate(envLogs, dateFilter)
  } else {
    return envLogs
  }
}
