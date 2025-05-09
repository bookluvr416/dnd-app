const ErrorDisplay = (message: { message: string }) => {
  return <p className="pt-2 text-red-300 text-medium">{message.message}</p>
};

export default ErrorDisplay;
