// components/SocialIcon.tsx

type SocialIconProps = {
    href: string;
    icon: JSX.Element;
    platform: string;
  };
  
  const SocialIcon = ({ href, icon, platform }: SocialIconProps) => (
    <a
      href={href}
      aria-label={`Link to ${platform}`}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-blue-500"
    >
      {icon}
    </a>
  );
  
  export default SocialIcon;
  export type { SocialIconProps };
  