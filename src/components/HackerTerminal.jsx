import React from 'react';
import './HackerTerminal.css';

const COMMANDS = [
  'storm',
  'storm max',
  'blackout',
  'riot',
  'drones',
  'love',
  'reset',
];

export default function HackerTerminal() {
  return (
    <div className="hacker-terminal">
      <div className="terminal-header">
        <span className="terminal-title">STUDENT STARTER - HACKER TERMINAL</span>
      </div>

      <div className="terminal-body">
        <div className="line line-system">Mission: build a command terminal MFE.</div>
        <div className="line line-system">Expected bus event to emit:</div>
        <div className="line line-output">Bus output: hacker:command with command + level payload</div>
        <div className="line line-system">Commands to support:</div>
        {COMMANDS.map((cmd) => (
          <div key={cmd} className="line line-output">- {cmd}</div>
        ))}
        <div className="line line-success">TODO: input handling + history + help command.</div>
      </div>
    </div>
  );
}
