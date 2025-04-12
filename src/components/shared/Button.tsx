interface Props {
  text: string;
  cssColor?: string;
  cssMargin?: string;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
  onClick?: () => void;
}

const Button: React.FC<Props> = ({ text, cssColor = '', cssMargin = '', ...props }) => {
  let color = cssColor.length ? cssColor : 'bg-purple-900/60';
  const margin = cssMargin.length ? cssMargin : '';

  if (props.disabled) {
    color = 'bg-purple-900/50 text-gray-200'
  }

  return (
    <button
      className={`rounded-lg p-2 text-medium outline-none
                hover:ring-2 hover:ring-purple-800 hover:border-purple-800
                focus-visible:ring-2 focus-visible:ring-purple-800 focus-visible:border-purple-800
                active:duration-200 active:bg-purple-900
                ${color} ${margin}
              `}
      {...props}
    >
      {text}
    </button>
  );
  
};

export default Button;