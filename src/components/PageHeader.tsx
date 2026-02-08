import { ChevronLeft, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  showShare?: boolean;
}

const PageHeader = ({ title, showShare = false }: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between px-4 bg-card"
      style={{ height: 56, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
    >
      <button onClick={() => navigate(-1)} className="text-foreground p-1 -ml-1" aria-label="返回">
        <ChevronLeft size={24} strokeWidth={1.8} />
      </button>
      <span className="text-lg font-semibold text-foreground">{title}</span>
      {showShare ? (
        <button className="text-foreground p-1 -mr-1" aria-label="分享">
          <Share2 size={20} strokeWidth={1.8} />
        </button>
      ) : (
        <div className="w-8" />
      )}
    </header>
  );
};

export default PageHeader;
