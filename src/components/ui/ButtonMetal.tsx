type Props = {
  children: React.ReactNode;
};

export default function ButtonMetal({ children }: Props) {
  return <button className="btn-metal">{children}</button>;
}