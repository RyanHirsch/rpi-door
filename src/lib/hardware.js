import Raspi from 'raspi-io';
import five from 'johnny-five';
const board = new five.Board({
  io: new Raspi(),
});

let doorStatus = null;

function setupOpenerSwitch({ opened, closing }) {
    const openerSwitch = new five.Switch('GPIO17');
    openerSwitch.invert = true;

    openerSwitch.on('close', function() {
      if(doorStatus !== 'opened') {
        doorStatus = 'opened';
        if(opened) {
          opened();
        }
      }
    });

    openerSwitch.on('open', function() {
      if(doorStatus !== 'closing' && doorStatus === 'opened') {
        doorStatus = 'closing';
        if(closing) {
          closing();
        }
      }
    });
}

function setupDoorSwitch({ closed, opening }) {
    const doorSwitch = new five.Switch('GPIO27');
    doorSwitch.invert = true;

    doorSwitch.on('close', function() {
      if(doorStatus !== 'closed') {
        doorStatus = 'closed';
        if(closed) {
          closed();
        }
      }
    });

    doorSwitch.on('open', function() {
      if(doorStatus !== 'opening' && doorStatus === 'closed') {
        doorStatus = 'opening';
        if(opening) {
          opening();
        }
      }
    });
}

export function initialize({ closing, opening, opened, closed }) {
  board.on('ready', function() {
    setupOpenerSwitch({ closing, opened });
    setupDoorSwitch({ opening, closed });
  });
}

export function getDoorStatus() {
  return doorStatus;
}
