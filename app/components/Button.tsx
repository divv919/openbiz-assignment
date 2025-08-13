export default function Button({
  text,
  disabled,
  onClick,
}: {
  text: string;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      disabled={disabled}
      className="bg-[#007BFF] px-[12px] py-[6px] rounded-sm text-white max-w-[188px] hover:bg-[#083f79] transition-all duration-150 ease-in-out cursor-pointer"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
