interface ActionBarProps {
  runCode: () => void;
}

const ActionBar = (props: ActionBarProps) => {
  return (
    <div>
      <button
        className="p-2 bg-gray-200 hover:bg-gray-300 rounded-md"
        onClick={props.runCode}
      >
        Run
      </button>
    </div>
  );
};

export default ActionBar;
