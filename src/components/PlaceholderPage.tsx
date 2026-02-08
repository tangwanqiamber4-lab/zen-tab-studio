interface PlaceholderPageProps {
  emoji: string;
  title: string;
  description?: string;
}

const PlaceholderPage = ({ emoji, title, description = "功能开发中" }: PlaceholderPageProps) => (
  <div className="flex flex-col items-center justify-center min-h-[70vh] bg-card gap-3">
    <span className="text-[64px] leading-none select-none">{emoji}</span>
    <h1 className="text-xl font-bold text-foreground">{title}</h1>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export default PlaceholderPage;
