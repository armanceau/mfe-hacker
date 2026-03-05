export function parseCommand(input) {
  const cmd = input.trim().toLowerCase();

  switch (cmd) {
    case "storm":
      return {
        event: "hacker:command",
        payload: { command: "storm", level: 2 },
        feedback: "✓ Command executed: STORM LEVEL 2",
      };

    case "storm max":
      return {
        event: "hacker:command",
        payload: { command: "storm", level: 3 },
        feedback: "✓ Command executed: STORM MAX LEVEL 3",
      };

    case "blackout":
      return {
        event: "hacker:command",
        payload: { command: "blackout", level: 2 },
        feedback: "✓ Command executed: BLACKOUT",
      };

    case "riot":
      return {
        event: "hacker:command",
        payload: { command: "riot", level: 2 },
        feedback: "✓ Command executed: RIOT",
      };

    case "drones":
      return {
        event: "hacker:command",
        payload: { command: "drones", level: 1 },
        feedback: "✓ Command executed: DRONES FORMATION",
      };

    case "love":
      return {
        event: "hacker:command",
        payload: { command: "love", level: 1 },
        feedback: "✓ Command executed: LOVE MODE ❤️",
      };

    case "reset":
      return {
        event: "hacker:command",
        payload: { command: "reset", level: 0 },
        feedback: "✓ City reset to normal.",
      };

    case "help":
      return {
        event: null,
        payload: null,
        feedback:
          "Commands: storm, storm max, blackout, riot, drones, love, reset",
      };

    default:
      return {
        event: null,
        payload: null,
        feedback: "⚠️ Command not found. Type 'help'.",
      };
  }
}
