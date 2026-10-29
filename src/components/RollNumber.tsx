/** Digit columns for the animated counters; pageEffects scrolls them to the target value. */
export default function RollNumber({ prefix, suffix }: { prefix?: string; suffix?: string }) {
  const digits = Array.from({ length: 10 }, (_, i) => i);
  const column = (cls: string) => (
    <div className={`roll-number ${cls}`} aria-hidden="true">
      {digits.map((d) => (
        <div className="section-number" key={d}>
          {d}
        </div>
      ))}
    </div>
  );
  const value = `${prefix ?? ''}${prefix ? '15' : '98'}${suffix ?? ''}`;
  return (
    <div className="roll-number-wrapper" role="img" aria-label={value}>
      {prefix && <div className="section-number alternate" aria-hidden="true">{prefix}</div>}
      {column('_01')}
      {column('_02')}
      {suffix && <div className="section-number alternate" aria-hidden="true">{suffix}</div>}
    </div>
  );
}
