/**
 * Tests de non-régression — EventBus
 */
class EventBus {
    constructor() { this.listeners = {}; }

    on(event, cb) {
        (this.listeners[event] ??= []).push(cb);
        return () => this.off(event, cb);
    }

    off(event, cb) {
        if (!this.listeners[event]) return;
        this.listeners[event] = this.listeners[event].filter((fn) => fn !== cb);
    }

    emit(event, data) {
        this.listeners[event]?.forEach((cb) => { try { cb(data); } catch { } });
    }

    once(event, cb) {
        const wrapper = (data) => { cb(data); this.off(event, wrapper); };
        this.on(event, wrapper);
    }
}

let bus;
beforeEach(() => { bus = new EventBus(); });

//test on of emit mock methods
describe('EventBus — on / off / emit', () => {
    test('le listener reçoit exactement la data émise', () => {
        const mock = jest.fn();
        bus.on('hacker:command', mock);
        bus.emit('hacker:command', { command: 'storm', level: 2 });

        expect(mock).toHaveBeenCalledTimes(1);
        expect(mock).toHaveBeenCalledWith({ command: 'storm', level: 2 });
    });

    test('off() supprime le listener, les autres survivent', () => {
        const removed = jest.fn();
        const kept = jest.fn();
        bus.on('hacker:command', removed);
        bus.on('hacker:command', kept);
        bus.off('hacker:command', removed);
        bus.emit('hacker:command', {});

        expect(removed).not.toHaveBeenCalled();
        expect(kept).toHaveBeenCalledTimes(1);
    });

    test('la fonction retournée par on() désabonne correctement', () => {
        const mock = jest.fn();
        const unsub = bus.on('hacker:command', mock);
        unsub();
        bus.emit('hacker:command', {});

        expect(mock).not.toHaveBeenCalled();
    });

    test('emit sans listener et off sur event inexistant ne lèvent pas d\'erreur', () => {
        expect(() => bus.emit('ghost:event', {})).not.toThrow();
        expect(() => bus.off('ghost:event', jest.fn())).not.toThrow();
    });

    test('un listener qui lève une erreur n\'empêche pas les suivants de s\'exécuter', () => {
        const good = jest.fn();
        bus.on('hacker:command', () => { throw new Error('boom'); });
        bus.on('hacker:command', good);
        expect(() => bus.emit('hacker:command', {})).not.toThrow();
        expect(good).toHaveBeenCalledTimes(1);
    });
});

//appel unique
describe('EventBus — once()', () => {
    test('appelé une seule fois, même après plusieurs emit', () => {
        const mock = jest.fn();
        bus.once('hacker:command', mock);
        bus.emit('hacker:command', {});
        bus.emit('hacker:command', {});
        expect(mock).toHaveBeenCalledTimes(1);
    });

    test('un on() classique continue après qu\'un once() se soit désabonné', () => {
        const onceMock = jest.fn();
        const onMock = jest.fn();
        bus.once('hacker:command', onceMock);
        bus.on('hacker:command', onMock);
        bus.emit('hacker:command', {});
        bus.emit('hacker:command', {});

        expect(onceMock).toHaveBeenCalledTimes(1);
        expect(onMock).toHaveBeenCalledTimes(2);
    });
});

//test enchainements des events
describe('EventBus — intégration payloads hacker', () => {
    const payloads = [
        { command: 'storm', level: 2 },
        { command: 'storm', level: 3 },
        { command: 'blackout', level: 2 },
        { command: 'riot', level: 2 },
        { command: 'drones', level: 1 },
        { command: 'love', level: 1 },
        { command: 'reset', level: 0 },
    ];

    test.each(payloads)(
        'hacker:command %j est transmis tel quel au listener',
        (payload) => {
            const mock = jest.fn();
            bus.on('hacker:command', mock);
            bus.emit('hacker:command', payload);
            expect(mock).toHaveBeenCalledWith(payload);
        }
    );

    test('séquence storm → reset : les levels reçus dans l\'ordre', () => {
        const levels = [];
        bus.on('hacker:command', ({ level }) => levels.push(level));
        bus.emit('hacker:command', { command: 'storm', level: 2 });
        bus.emit('hacker:command', { command: 'reset', level: 0 });
        expect(levels).toEqual([2, 0]);
    });
});
