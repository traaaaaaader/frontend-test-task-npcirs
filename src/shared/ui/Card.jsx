export const Card = ({ title, children, className = "", headerAction = null, noPadding = false }) => {
  return (
    <div className={`bg-surface rounded-xl shadow-sm border border-default p-6 ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-default">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-text">{title}</h3>
            {headerAction}
          </div>
        </div>
      )}
      {children}
    </div>
  );
};
