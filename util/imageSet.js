export const createInitials = (name) => {
  if (name == null) return;
  let initials;

  const nameSplit = name.split(" ");
  const nameLength = nameSplit.length;
  if (nameLength > 1) {
    initials = nameSplit[0].substring(0, 1) + nameSplit[nameLength - 1].substring(0, 1);
    return initials.toUpperCase();
  } else if (nameLength > 0) {
    return initials = nameSplit[0].substring(0, 1).toUpperCase();
  } else {
    return;
  }
};