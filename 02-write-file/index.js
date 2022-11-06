
const path = require('path');
const fs = require('fs');

const { stdin , stdout } = process;

const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Hello! Please enter your text...\n<<Type "exit" or press Ctrl + C to quit...>>\n\n' );

stdin.on('data', (data) => {
    if (data.toString().trim() === 'exit') {
    exitProcess();
    }
    output.write(data);
});

process.on('SIGINT', exitProcess);

function exitProcess() {
    stdout.write('\nGoodbye!');
    process.exit();
}