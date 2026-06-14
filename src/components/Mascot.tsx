import Image from "next/image";

export type MutternPose =
  | "stand"
  | "wave"
  | "point"
  | "think"
  | "present"
  | "idea"
  | "thumbsup"
  | "celebrate"
  | "working"
  | "tool"
  | "phone"
  | "laptop"
  | "screw";

// Muttern beholder sin egen palett (navy + terracotta) — vises kun på lyse flater.
export default function Mascot({
  pose = "stand",
  size = 104,
  bubble,
  flip = false,
  className = "",
}: {
  pose?: MutternPose;
  size?: number;
  bubble?: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div className={`mascot ${className}`.trim()}>
      {bubble ? <span className="mascot-bubble">{bubble}</span> : null}
      <Image
        src={`/mascot/muttern-${pose}.svg`}
        alt=""
        aria-hidden
        width={size}
        height={Math.round((size * 240) / 220)}
        unoptimized
        className="mascot-img"
        style={flip ? { transform: "scaleX(-1)" } : undefined}
      />
    </div>
  );
}
