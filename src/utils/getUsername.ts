export const getUsername = (name: string) => {
  const names = name.toLowerCase().split(" ");
  let newName = "";
  names.map((name) => {
    newName += name;
  });
  return newName;
}