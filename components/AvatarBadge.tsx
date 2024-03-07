const AvatarBadge = ({ name }: { name: string }) => {
  const initials = name ? name[0].toUpperCase() : "U";

  return (
    <div className="flex items-center justify-center w-6 h-6 aspect-square rounded-full bg-[#c4b09f] text-white text-xs font-semibold">
      {initials}
    </div>
  );
};
export default AvatarBadge;
