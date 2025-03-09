import dateFormat from "@/utils/date-time";

export const Publisher = ({ className, name, createdAt }) => {
  const avatar = name.charAt(0).toUpperCase();
  const publishTime = dateFormat(createdAt);
  return (
    <div className={`flex flex-row gap-4 items-center ${className || ""}`}>
      <div className="flex items-center justify-center h-10 w-10 bg-black rounded-full">
        <div className="text-white">{avatar}</div>
      </div>
      <div className="flex flex-col">
        <div className="font-poppins font-semibold">{name}</div>
        <div className="text-sm">
          <span className="text-gray-500">Published at</span> {publishTime}
        </div>
      </div>
    </div>
  );
};
