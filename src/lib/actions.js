import logger from './logger';

function timestamp() {
  return new Date();
}

export function opened() {
  logger.log('info', `${timestamp()} opened`);
}

export function closed() {
  logger.log('info', `${timestamp()} closed`);
}

export function opening() {
  logger.log('info', `${timestamp()} opening`);
}

export function closing() {
  logger.log('info', `${timestamp()} closing`);
}
