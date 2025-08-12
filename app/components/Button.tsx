export default function Button({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      className="bg-[#007BFF] px-[12px] py-[6px] rounded-sm text-white max-w-[188px]"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
