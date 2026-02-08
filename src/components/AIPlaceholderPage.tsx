import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";

interface AIPlaceholderPageProps {
  emoji: string;
  title: string;
}

const AIPlaceholderPage = ({ emoji, title }: AIPlaceholderPageProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-background min-h-screen">
      <PageHeader title={title} showShare />
      <div className="flex flex-col items-center justify-center flex-1 gap-4 px-5">
        <span className="text-[64px] leading-none select-none">{emoji}</span>
        <h1 className="text-xl font-bold text-foreground">功能开发中</h1>
        <p className="text-sm text-muted-foreground">敬请期待完整版本</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 h-11 px-8 bg-keep-green text-keep-green-foreground font-medium text-sm rounded-lg transition-transform duration-200 hover:-translate-y-0.5"
        >
          返回首页
        </button>
      </div>
    </div>
  );
};

export default AIPlaceholderPage;
