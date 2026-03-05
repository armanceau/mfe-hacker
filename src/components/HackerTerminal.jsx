import React from 'react';
import './HackerTerminal.css';
import { parseCommand } from '../services/commandParser';

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
  // @todo : pour tester actuellement en local sans l'event bus : 
  // @todo : à supprimer lors de l'implémentation de l'event bus
  // console.log(parseCommand("storm"));
  // console.log(parseCommand("blackout"));
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
