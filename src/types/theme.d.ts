type Theme = 'light' | 'dark';

type ThemeOptions = {
  titleColour: React.CSSProperties['color'];
  background: React.CSSProperties['background'];
  colour: React.CSSProperties['color'];
  secondaryColour: React.CSSProperties['color'];
  highlightColour: React.CSSProperties['color'];
  highlightHoverColour: React.CSSProperties['color'];
  warningColour: React.CSSProperties['color'];
  listItems: {
    background: React.CSSProperties['background'];
    colour: React.CSSProperties['color'];
    selectedBackground: React.CSSProperties['background'];
    selectedColour: React.CSSProperties['color'];
    secondaryBackground: React.CSSProperties['background'];
    secondaryColour: React.CSSProperties['color'];
  };
  button: {
    background: React.CSSProperties['background'];
    colour: React.CSSProperties['color'];
  },
  card: {
    background: React.CSSProperties['background'];
    colour: React.CSSProperties['color'];
  },
  input: {
    background: React.CSSProperties['background'];
    colour: React.CSSProperties['color'];
  },
  calendar: {
    background: React.CSSProperties['background'];
    colour: React.CSSProperties['color'];
    secondaryBackground: React.CSSProperties['background'];
    secondaryColour: React.CSSProperties['color'];
    restBackground: React.CSSProperties['background'];
    restColour: React.CSSProperties['color'];
  },
  dice: {
    background: React.CSSProperties['background'];
    colour: React.CSSProperties['color'];
  }
}