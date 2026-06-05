export function StarRating({ rating }: { rating: number }) {
  const normalizedRating = Math.min(Math.max(rating, 0), 5);
  const fillWidth = `${normalizedRating * 20}%`;

  return (
    <span
      className="star-rating"
      aria-label={`${normalizedRating.toFixed(1)} out of 5`}
    >
      <span className="star-rating-empty" aria-hidden="true">
        ★★★★★
      </span>
      <span
        className="star-rating-fill"
        aria-hidden="true"
        style={{ width: fillWidth }}
      >
        ★★★★★
      </span>
    </span>
  );
}
