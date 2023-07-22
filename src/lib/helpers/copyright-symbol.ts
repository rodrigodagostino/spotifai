const getCopyrightSymbol = (type: string): string => {
  switch (type) {
    case 'R':
      return '®';
    case 'P':
      return '℗';
    case 'C':
      return '©';
    default:
      return type;
  }
};

export default getCopyrightSymbol;
