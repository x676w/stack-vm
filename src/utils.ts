export function assert(condition: any, message: string) {
  if(!condition) {
    throw new Error(message);
  };
};

export function random(min: number, max: number) {
  return min + Math.round(Math.random() * (max - min));
};