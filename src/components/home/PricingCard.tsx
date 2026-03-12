const PricingCard = () => {
  return (
    <section className="px-5 pb-6">
      <div className="bg-card rounded-xl border border-primary/10 px-5 py-4 flex items-center gap-4">
        <span className="text-3xl leading-none select-none">💰</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-foreground">透明定价</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            免费试用7天 · 之后仅需 <span className="font-semibold text-foreground">¥49/月</span>
          </p>
        </div>
        <a href="#" className="text-xs font-medium text-keep-green whitespace-nowrap">
          详情 →
        </a>
      </div>
    </section>
  );
};

export default PricingCard;
