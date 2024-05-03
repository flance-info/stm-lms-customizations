export const getButtonStyles = (type: string) => {
  switch (type) {
    case 'edit':
      return {
        borderRight: '1px solid',
        borderColor: 'rgba(219, 224, 233, 0.1)',
        color: 'dark30',
        '_hover': { bg: 'selectedTab', color: 'white' },
      };
    case 'course':
      return { bg: 'mainBackground', color: 'dark70', '_hover': { color: 'dark' } };
    case 'lesson':
      return { bg: 'white', color: 'dark70', '_hover': { color: 'dark' } };
    default:
      return {};
  }
};