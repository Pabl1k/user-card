export const formatPhoneNumber = (phoneNumber: string, separator = '') => {
  const match = phoneNumber && phoneNumber.match(/^\+(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})(\d*)$/);

  if (!match) {
    return phoneNumber;
  }

  const [, code, operator, part1, part2, part3, part4] = match;
  return `+${code} (${operator}) ${part1} ${separator} ${part2} ${separator} ${part3}${part4}`;
};
