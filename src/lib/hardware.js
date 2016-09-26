import Raspi from 'raspi-io';
import five from 'johnny-five';
const board = new five.Board({
  io: new Raspi(),
});

let doorStatus = null;

export function initialize({ closing, opening, opened, closed }) {
  board.on('ready', function() {
    const openerSwitch = new five.Switch('GPIO17');
    const doorSwitch = new five.Switch('GPIO27');

    doorSwitch.invert = true;

    openerSwitch.on('close', function() {
      if(doorStatus !== 'opened') {
        doorStatus = 'opened';
        if(opened) {
          opened();
        }
      }
    });

    openerSwitch.on('open', function() {
      if(doorStatus !== 'closing') {
        doorStatus = 'closing';
        if(closing) {
          closing();
        }
      }
    });

    doorSwitch.on('close', function() {
      if(doorStatus !== 'closed') {
        doorStatus = 'closed';
        if(closed) {
          closed();
        }
      }
    });

    doorSwitch.on('open', function() {
      if(doorStatus !== 'opening') {
        doorStatus = 'opening';
        if(opening) {
          opening();
        }
      }
    });
  });
}

export function getDoorStatus() {
  return doorStatus;
}
