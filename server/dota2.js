import { EventEmitter } from "events";

var events = new EventEmitter();
var clients = [];

function gsi_client(ip, auth) {
  this.ip = ip;
  this.auth = auth;
  this.gamestate = {};
}
gsi_client.prototype.__proto__ = EventEmitter.prototype;

function Check_client(req, res, next) {
  // Check if this IP is already talking to us
  for (var i = 0; i < clients.length; i++) {
    if (clients[i].ip === req.ip) {
      req.client = clients[i];
      return next();
    }
  }

  // Create a new client
  clients.push(new gsi_client(req.ip, req.body.auth));
  req.client = clients[clients.length - 1];
  req.client.gamestate = req.body;

  // Notify about the new client
  events.emit("newclient", clients[clients.length - 1]);

  next();
}

function Emit_all(prefix, obj, emitter) {
  Object.keys(obj).forEach(function (key) {
    // For scanning keys and testing
    // emitter.emit("key", ""+prefix+key);
    // console.log("Emitting '"+prefix+key+"' - " + obj[key]);
    emitter.emit(prefix + key, obj[key]);
  });
}

function Recursive_emit(prefix, changed, body, emitter) {
  Object.keys(changed).forEach(function (key) {
    if (typeof changed[key] == "object") {
      if (body[key] != null) {
        // safety check
        Recursive_emit(prefix + key + ":", changed[key], body[key], emitter);
      }
    } else {
      // Got a key
      if (body[key] != null) {
        if (typeof body[key] == "object") {
          // Edge case on added:item/ability:x where added shows true at the top level
          // and doesn't contain each of the child keys
          Emit_all(prefix + key + ":", body[key], emitter);
        } else {
          // For scanning keys and testing
          // emitter.emit("key", ""+prefix+key);
          // console.log("Emitting '"+prefix+key+"' - " + body[key]);
          emitter.emit(prefix + key, body[key]);
        }
      }
    }
  });
}

function Process_changes(section) {
  return function (req, res, next) {
    if (req.body[section]) {
      // console.log("Starting recursive emit for '" + section + "'");
      Recursive_emit("", req.body[section], req.body, req.client);
    }
    next();
  };
}

function Update_gamestate(req, res, next) {
  req.client.gamestate = req.body;
  next();
}

function New_data(req, res) {
  req.client.emit("newdata", req.body);
  res.end();
}

function Check_auth(tokens) {
  return function (req, res, next) {
    if (tokens) {
      if (
        req.body.auth && // Body has auth
        (req.body.auth.token == tokens || // tokens was a single string or
          (tokens.constructor === Array && // tokens was an array and
            tokens.indexOf(req.body.auth.token) != -1))
      ) {
        // containing the token
        next();
      } else {
        // Not a valid auth, drop the message
        console.log(
          "Dropping message from IP: " + req.ip + ", no valid auth token"
        );
        res.end();
      }
    } else {
      next();
    }
  };
}

const d2gsi = function (options, app = express()) {
  options = options || {};
  var tokens = options.tokens || null;

  app.post(
    "/",
    Check_auth(tokens),
    Check_client,
    Update_gamestate,
    Process_changes("previously"),
    Process_changes("added"),
    New_data
  );

  this.events = events;
  return this;
};

export const runDotaClient = function (app) {
  let result = {
    gameState: undefined,
  };
  const d2gsiClient = new d2gsi(null, app);

  d2gsiClient.events.on("newclient", function (client) {
    console.log(
      "New client connection, IP address: " +
        client.ip +
        ", Auth token: " +
        client.auth
    );
    result.gameState = client;
  });

  return result;
};
