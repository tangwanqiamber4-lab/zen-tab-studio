interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage = ({ title }: PlaceholderPageProps) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
    <h1 className="text-2xl font-bold text-foreground">{title}</h1>
    <p className="text-muted-foreground text-sm">功能开发中</p>
  </div>
);

export default PlaceholderPage;
