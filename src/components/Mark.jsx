/** Section mark: number, fine rule and chapter name. */
export default function Mark({ no, children }) {
  return (
    <p className="mark label">
      <span className="mark__no">{no}</span>
      <span className="mark__rule" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
