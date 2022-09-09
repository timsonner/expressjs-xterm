const socket = new WebSocket("ws://localhost:6060");

var term = new window.Terminal({
    cursorBlink: true
});
term.open(document.getElementById('terminal'));

function init() {
    if (term._initialized) {
        return;
    }

    term._initialized = true;

    term.prompt = () => {
        term.write('\r\n$ ');
    };
    prompt(term);

// docs https://xtermjs.org/docs/api/vtfeatures/
// ascii literals https://mw.lojban.org/papri/List_of_ASCII_letterals#ASCII_control_code_chart
    term.onData(e => {
        switch (e) {
            case '\u0003': // Ctrl+C
                // term.write('^C');
                term.write('\x03')
                // try using a route to send sigint process to ptyProcess
                try {
                    axios.get('/kill')
                } catch (error) {
                    console.log(error)
                }
                prompt(term);
                break;
            case '\r': // Enter
                runCommand(term, command);
                command = '';
                break;
            case '\u007F': // Backspace (DEL)
                // Do not delete the prompt
                if (term._core.buffer.x > 2) {
                    term.write('\b \b');
                    if (command.length > 0) {
                        command = command.substr(0, command.length - 1);
                    }
                }
                break;
            case '\u0009':
                console.log('tabbed');
                // TODO: tab autocomplete
                term.write('\x88')
                break;
            default:
                if (e >= String.fromCharCode(0x20) && e <= String.fromCharCode(0x7E) || e >= '\u00a0') {
                    command += e;
                    term.write(e);
                }
        }
    });
}

function clearInput(command) {
    var inputLengh = command.length;
    for (var i = 0; i < inputLengh; i++) {
        term.write('\b \b');
    }
}
function prompt(term) {
    command = '';
    term.write('\r\n$ ');
}
socket.onmessage = (event) => {
    term.write(event.data);
}

function runCommand(term, command) {
    if (command.length > 0) {
        clearInput(command);
        socket.send(command + '\n');
        return;
    }
}


init();
