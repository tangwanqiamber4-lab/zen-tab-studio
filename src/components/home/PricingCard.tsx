const PricingCard = () => {
  return (
    <section className="px-5 pb-10">
      <div className="bg-card rounded-xl border border-primary/10 p-8 text-center">
        <span className="text-5xl leading-none select-none">💰</span>
        <h3 className="text-lg font-bold text-foreground mt-4">透明定价</h3>
        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
          所有功能免费试用7天
          <br />
          之后仅需 <span className="font-semibold text-foreground">¥49/月</span> · 随时取消
        </p>
        <a
          href="#"
          className="inline-block mt-4 text-sm font-medium text-keep-green hover:underline"
        >
          查看详情 →
        </a>
      </div>
    </section>
  );
};

export default PricingCard;
