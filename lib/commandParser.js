var _ = require('underscore');

exports.parseCommandToString = function (command) {
  if (_.isString(command))
    return command;

  if (!_.isUndefined(command.command) && !_.isString(command.command)) {
    throw new Error("command must be a String");
  }

  keys = _.keys(command);

  if (_.contains(keys, 'cmd'))
    return command.cmd;

  cmd = command.command + ' ';

  if (_.contains(keys, 'positional')) {
    cmd = cmd + command['positional'].join(' ');
  }

  if (_.contains(keys, 'short')) {
    var shortCmd = command['short'];
    var shortKeys = _.keys(command['short']);

    shortKeys.forEach(function (shortKey) {
      cmd += genParam(shortKey, shortCmd[shortKey], true)
    });
  }

  keys.forEach(function (key) {
    keyLower = key.toLowerCase(key);
    if (keyLower != 'short' && keyLower != 'command' && keyLower != 'positional' && keyLower != 'callback') {
      cmd += genParam(key, command[key])
    }
  });

  return cmd;
}

function genParam(key, val, isSingleDash) {
  var cmd = (isSingleDash ? ' -' : ' --') + key
  if (!_.isNull(val) && !_.isEmpty(val) && val != 'true')
    cmd = cmd + ' ' + val
  return cmd;
}

exports.parseStringToCommand = function (command) {
  return '';
}