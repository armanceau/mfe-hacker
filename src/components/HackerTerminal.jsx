import React, { useState } from 'react';
import './HackerTerminal.css';
import { parseCommand } from '../services/commandParser';
import eventBus from '../shared/eventBus';

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
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = parseCommand(input);

    if (result.event) {
      eventBus.emit(result.event, result.payload);
      console.log('EVENT EMITTED', result.payload);
    }

    setHistory(prev => [
      ...prev,
      `root@neocity:~$ ${input}`,
      result.feedback
    ]);

    setInput('');
  };

  return (
    <div className="hacker-terminal">
      <div className="terminal-header">
        <span className="terminal-title">STUDENT STARTER - HACKER TERMINAL</span>
      </div>

      <div className="terminal-body">
        {history.map((line, i) => (
          <div key={i} className="line">
            {line}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="terminal-input">
          <span>root@neocity:~$ </span>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            autoFocus
            autoComplete="off"
          />
        </form>

        <div className="line line-system">Commands to support:</div>
        {COMMANDS.map((cmd) => (
          <div key={cmd} className="line line-output">- {cmd}</div>
        ))}
      </div>
    </div>
  );
}