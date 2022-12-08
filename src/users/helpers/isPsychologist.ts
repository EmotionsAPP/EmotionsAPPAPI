
export const isPsychologist = (title: string): boolean => {
  const lowerCaseTitle = title.toLowerCase();

  return lowerCaseTitle.indexOf("psicologia") !== -1;
}
