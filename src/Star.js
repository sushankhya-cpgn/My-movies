import { useState } from "react";

export default function Star({
  max = 5,
  color = "#fcc419",
  size = 30,
  className = "",
  rating = { rating },
  setRating = { setRating },
}) {
  const star = {
    height: `${size}px`,
    width: `${size}px`,
    justifyContent: "center",
    alignItems: "center",
    padding: "3px",

    // fontSize: `${size}px`,
  };
  const star_section = {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  };

  const [tempRating, setTempRating] = useState(0);

  function handleRating(star_number) {
    setRating(star_number);
  }
  function handletempRating(star_number) {
    setTempRating(star_number);
  }
  const message = ["Worst", "Bad", "Good", "Very Good", "Excellent"];
  return (
    <>
      <div style={star_section} className={className}>
        {Array.from({ length: max }, (_, i) => (
          <span style={star}>
            <StarRating
              handleRating={handleRating}
              count={i + 1}
              setTempRating={setTempRating}
              handletempRating={handletempRating}
              key={i}
              full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
              color={color}
              size={size}
            />
          </span>
        ))}
        {max <= message.length ? (
          rating && (
            <p style={{ color: "black" }}>
              You rated this product {message[rating - 1]}
            </p>
          )
        ) : (
          <p>{rating} </p>
        )}
      </div>
    </>
  );
}

function StarRating({ count, handleRating, handletempRating, full, color }) {
  return (
    <>
      {full ? (
        <svg
          onClick={() => handleRating(count)}
          style={{ cursor: "pointer" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
          onMouseEnter={() => handletempRating(count)}
          onMouseLeave={() => handletempRating(0)}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          onClick={() => handleRating(count)}
          style={{ cursor: "pointer" }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#000"
          onMouseEnter={() => handletempRating(count)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </>
  );
}
