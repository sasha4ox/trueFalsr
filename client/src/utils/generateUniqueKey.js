export default function generateUniqueKey(item) {
  const randomNumber = Math.random() * item;
  return `${randomNumber}_${new Date().getTime()}`;
}
