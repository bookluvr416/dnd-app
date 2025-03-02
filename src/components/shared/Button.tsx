interface Props {
  text: string;
  cssColor?: string;
  cssMargin?: string;
  type?: 'submit' | 'reset' | 'button';
  onClick?: () => void;
}

const Button: React.FC<Props> = ({ text, cssColor = '', cssMargin = '', ...props }) => {

  const color = cssColor.length ? cssColor : 'bg-purple-900/60 hover:bg-purple-900';
  const margin = cssMargin.length ? cssMargin : '';

  return (
    <button
      className={`rounded-lg p-2 text-medium focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-purple-700 ${color} ${margin}`}
      {...props}
    >
      {text}
    </button>
  );
  
};

export default Button;