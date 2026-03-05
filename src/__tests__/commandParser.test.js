import { parseCommand } from '../services/commandParser';

const HACKER_COMMANDS = [
    // input          | command    | level | feedbackSnippet
    ['storm', 'storm', 2, 'STORM LEVEL 2'],
    ['storm max', 'storm', 3, 'STORM MAX LEVEL 3'],
    ['blackout', 'blackout', 2, 'BLACKOUT'],
    ['riot', 'riot', 2, 'RIOT'],
    ['drones', 'drones', 1, 'DRONES'],
    ['love', 'love', 1, 'LOVE'],
    ['reset', 'reset', 0, 'reset'],
];

describe('parseCommand — commandes hacker', () => {
    test.each(HACKER_COMMANDS)(
        '"%s" → event:hacker:command, command:%s, level:%i',
        (input, expectedCommand, expectedLevel, feedbackSnippet) => {
            const { event, payload, feedback } = parseCommand(input);

            expect(event).toBe('hacker:command');
            expect(payload).toEqual({ command: expectedCommand, level: expectedLevel });
            expect(feedback.toLowerCase()).toContain(feedbackSnippet.toLowerCase());
        }
    );

    test.each(HACKER_COMMANDS)(
        '"%s" est insensible à la casse et aux espaces',
        (input) => {
            const normalized = parseCommand(input);
            const upper = parseCommand(input.toUpperCase());
            const padded = parseCommand(`  ${input}  `);

            expect(upper.event).toBe(normalized.event);
            expect(upper.payload).toEqual(normalized.payload);
            expect(padded.event).toBe(normalized.event);
            expect(padded.payload).toEqual(normalized.payload);
        }
    );
});


describe('parseCommand — commandes locales', () => {
    test('help : pas d\'event, liste toutes les commandes disponibles', () => {
        const { event, payload, feedback } = parseCommand('help');

        expect(event).toBeNull();
        expect(payload).toBeNull();
        ['storm', 'blackout', 'riot', 'drones', 'love', 'reset'].forEach((cmd) =>
            expect(feedback.toLowerCase()).toContain(cmd)
        );
    });

    test.each(['', '   ', 'foobar', 'hak3r'])(
        'entrée invalide "%s" : pas d\'event, feedback d\'erreur',
        (input) => {
            const { event, payload, feedback } = parseCommand(input);

            expect(event).toBeNull();
            expect(payload).toBeNull();
            expect(feedback).toContain('not found');
        }
    );
});


describe('parseCommand — contrat de structure', () => {
    const allInputs = [...HACKER_COMMANDS.map(([input]) => input), 'help', 'badcmd'];

    test.each(allInputs)('"%s" retourne toujours { event, payload, feedback }', (input) => {
        const result = parseCommand(input);

        expect(result).toHaveProperty('event');
        expect(result).toHaveProperty('payload');
        expect(result).toHaveProperty('feedback');
        expect(result.feedback.length).toBeGreaterThan(0);
    });
});
