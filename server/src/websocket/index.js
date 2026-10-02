/**
 * ABN TRADE
 * WebSocket Server
 *
 * Endpoint:
 *   ws://localhost:<WS_PORT>/ws
 *
 * Channels:
 *   MARKET_DATA
 *   AI_NOTE
 *
 * Markets:
 *   IDX
 *   MT5
 */

import { WebSocketServer, WebSocket } from "ws";

let wss = null;

const clients = new Map();

/* =========================================================
 * SEND
 * ========================================================= */

function send(socket, payload) {
  if (socket.readyState !== WebSocket.OPEN) {
    return false;
  }

  try {
    socket.send(JSON.stringify(payload));
    return true;
  } catch (error) {
    console.error("ABN WS: Send error:", error.message);

    return false;
  }
}

/* =========================================================
 * CLIENT ID
 * ========================================================= */

function createClientId() {
  return `ws_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

/* =========================================================
 * MESSAGE HANDLER
 * ========================================================= */

function handleMessage(socket, data) {
  const client = clients.get(socket);

  if (!client) {
    return;
  }

  switch (data.type) {
    /* -----------------------------------------------------
     * HELLO
     * --------------------------------------------------- */

    case "HELLO":
      send(socket, {
        type: "ack",
        success: true,
        data: {
          type: "HELLO",
        },
        timestamp: Date.now(),
      });
      break;

    /* -----------------------------------------------------
     * PING
     * --------------------------------------------------- */

    case "PING":
      send(socket, {
        type: "PONG",
        success: true,
        timestamp: Date.now(),
      });
      break;

    /* -----------------------------------------------------
     * AUTH
     *
     * Temporary authentication.
     * JWT akan dihubungkan ke authService berikutnya.
     * --------------------------------------------------- */

    case "AUTH":
      client.authenticated = true;

      client.user = data.user || null;

      send(socket, {
        type: "AUTH_ACK",
        success: true,
        message: "WebSocket authentication accepted.",
        user: client.user,
        timestamp: Date.now(),
      });

      break;

    /* -----------------------------------------------------
     * SUBSCRIBE MARKET
     * --------------------------------------------------- */

    case "SUBSCRIBE_MARKET":
      client.subscriptions.market = true;

      send(socket, {
        type: "SUBSCRIBE_ACK",
        success: true,
        channel: "MARKET_DATA",
        timestamp: Date.now(),
      });

      break;

    /* -----------------------------------------------------
     * UNSUBSCRIBE MARKET
     * --------------------------------------------------- */

    case "UNSUBSCRIBE_MARKET":
      client.subscriptions.market = false;

      send(socket, {
        type: "UNSUBSCRIBE_ACK",
        success: true,
        channel: "MARKET_DATA",
        timestamp: Date.now(),
      });

      break;

    /* -----------------------------------------------------
     * SUBSCRIBE AI
     * --------------------------------------------------- */

    case "SUBSCRIBE_AI":
      client.subscriptions.ai = true;

      send(socket, {
        type: "SUBSCRIBE_ACK",
        success: true,
        channel: "AI_NOTE",
        timestamp: Date.now(),
      });

      break;

    /* -----------------------------------------------------
     * UNSUBSCRIBE AI
     * --------------------------------------------------- */

    case "UNSUBSCRIBE_AI":
      client.subscriptions.ai = false;

      send(socket, {
        type: "UNSUBSCRIBE_ACK",
        success: true,
        channel: "AI_NOTE",
        timestamp: Date.now(),
      });

      break;

    /* -----------------------------------------------------
     * UNKNOWN MESSAGE
     * --------------------------------------------------- */

    default:
      send(socket, {
        type: "error",
        success: false,
        message: `Unknown WebSocket message type: ${data.type}`,
        timestamp: Date.now(),
      });
  }
}

/* =========================================================
 * START SERVER
 * ========================================================= */

export function startWebSocketServer(port) {
  if (wss) {
    console.log("ABN WS: WebSocket server already running.");

    return wss;
  }

  wss = new WebSocketServer({
    port,
    path: "/ws",
  });

  /* -------------------------------------------------------
   * LISTENING
   * ----------------------------------------------------- */

  wss.on("listening", () => {
    console.log(`ABN WS: WebSocket server listening on ${port}/ws`);
  });

  /* -------------------------------------------------------
   * CONNECTION
   * ----------------------------------------------------- */

  wss.on("connection", (socket, request) => {
    const clientId = createClientId();

    const client = {
      id: clientId,

      socket,

      authenticated: false,

      user: null,

      subscriptions: {
        market: false,
        ai: false,
      },

      connectedAt: Date.now(),

      remoteAddress: request.socket.remoteAddress,
    };

    clients.set(socket, client);

    console.log(
      `ABN WS: Client connected ${clientId} from ${client.remoteAddress}`,
    );

    /* ---------------------------------------------------
     * CONNECTION MESSAGE
     * ------------------------------------------------- */

    send(socket, {
      type: "connection",
      success: true,
      clientId,
      message: "ABN Trade WebSocket connected.",
      timestamp: Date.now(),
    });

    /* ---------------------------------------------------
     * MESSAGE
     * ------------------------------------------------- */

    socket.on("message", (message) => {
      try {
        const raw = message.toString();

        const data = JSON.parse(raw);

        if (!data || typeof data !== "object" || Array.isArray(data)) {
          throw new Error("Invalid message object.");
        }

        console.log("ABN WS: Message received:", data);

        handleMessage(socket, data);
      } catch (error) {
        console.error("ABN WS: Invalid message:", error.message);

        send(socket, {
          type: "error",
          success: false,
          message: "Invalid JSON message.",
          timestamp: Date.now(),
        });
      }
    });

    /* ---------------------------------------------------
     * CLOSE
     * ------------------------------------------------- */

    socket.on("close", () => {
      clients.delete(socket);

      console.log(`ABN WS: Client disconnected ${clientId}`);
    });

    /* ---------------------------------------------------
     * ERROR
     * ------------------------------------------------- */

    socket.on("error", (error) => {
      console.error(`ABN WS: Client error ${clientId}:`, error.message);
    });
  });

  /* -------------------------------------------------------
   * SERVER ERROR
   * ----------------------------------------------------- */

  wss.on("error", (error) => {
    console.error("ABN WS: Server error:", error.message);
  });

  return wss;
}

/* =========================================================
 * GET SERVER
 * ========================================================= */

export function getWebSocketServer() {
  return wss;
}

/* =========================================================
 * GET CLIENTS
 * ========================================================= */

export function getWebSocketClients() {
  return Array.from(clients.values()).map((client) => ({
    id: client.id,

    authenticated: client.authenticated,

    user: client.user,

    subscriptions: client.subscriptions,

    connectedAt: client.connectedAt,

    remoteAddress: client.remoteAddress,
  }));
}

/* =========================================================
 * BROADCAST ALL
 * ========================================================= */

export function broadcast(data) {
  if (!wss) {
    return 0;
  }

  const payload = typeof data === "string" ? data : JSON.stringify(data);

  let sent = 0;

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
      sent++;
    }
  });

  return sent;
}

/* =========================================================
 * BROADCAST MARKET DATA
 *
 * IDX:
 *
 * broadcastMarketData({
 *   market: "IDX",
 *   symbol: "BBCA",
 *   data: {
 *     last: 6250,
 *     volume: 23115900
 *   }
 * });
 *
 * MT5:
 *
 * broadcastMarketData({
 *   market: "MT5",
 *   symbol: "EURUSD",
 *   data: {
 *     bid: 1.17452,
 *     ask: 1.17464
 *   }
 * });
 * ========================================================= */

export function broadcastMarketData({ market, symbol, data, timestamp }) {
  if (!wss) {
    return 0;
  }

  const payload = {
    type: "MARKET_DATA",

    success: true,

    market: market || null,

    symbol: symbol || null,

    data: data || {},

    timestamp: timestamp || Date.now(),
  };

  const message = JSON.stringify(payload);

  let sent = 0;

  clients.forEach((client) => {
    if (
      client.subscriptions.market &&
      client.socket.readyState === WebSocket.OPEN
    ) {
      try {
        client.socket.send(message);

        sent++;
      } catch (error) {
        console.error(`ABN WS: Market send error ${client.id}:`, error.message);
      }
    }
  });

  return sent;
}

/* =========================================================
 * BROADCAST AI NOTE
 * ========================================================= */

export function broadcastAINote(data) {
  if (!wss) {
    return 0;
  }

  const payload = {
    type: "AI_NOTE",

    success: true,

    data: data || {},

    timestamp: Date.now(),
  };

  const message = JSON.stringify(payload);

  let sent = 0;

  clients.forEach((client) => {
    if (
      client.subscriptions.ai &&
      client.socket.readyState === WebSocket.OPEN
    ) {
      try {
        client.socket.send(message);

        sent++;
      } catch (error) {
        console.error(`ABN WS: AI send error ${client.id}:`, error.message);
      }
    }
  });

  return sent;
}

/* =========================================================
 * STOP SERVER
 * ========================================================= */

export async function stopWebSocketServer() {
  if (!wss) {
    return true;
  }

  return new Promise((resolve) => {
    wss.close(() => {
      clients.clear();

      wss = null;

      console.log("ABN WS: WebSocket server stopped.");

      resolve(true);
    });
  });
}
