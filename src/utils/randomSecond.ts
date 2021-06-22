export default (): number => {
  const min = 5;
  const max = 20;
  const random = min + Math.random() * (max + 1 - min);
  return Math.floor(random);
}
