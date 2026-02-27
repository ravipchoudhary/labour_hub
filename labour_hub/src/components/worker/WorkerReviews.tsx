import { useState } from "react";
import { Worker } from "../../data/worker";

type Props = {
  worker: Worker;
  onReviewAdded: (reviews: any[]) => void;
};

const WorkerReviews = ({ worker, onReviewAdded }: Props) => {
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const storedData = localStorage.getItem("userData");
  console.log("Stored user data from localStorage:", storedData);
  const submitReview = async () => {
    if (!comment.trim()) {
      alert("Please write a review before submitting.");
      return;
    }

    // ✅ Get logged-in user from localStorage
    if (!storedData) {
      alert("Please login first.");
      return;
    }

    const parsedData = JSON.parse(storedData);
    console.log("Parsed user data from localStorage:", parsedData);
    const loggedInUserName = parsedData?.user?.name;

    try {
      const res = await fetch(
        `http://localhost:4000/api/labour/${worker._id}/review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${parsedData.token}`,
          },
          body: JSON.stringify({
            name: loggedInUserName,
            rating,
            comment,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      onReviewAdded(data.reviews);

      setComment("");
      setRating(5);
      setShowForm(false);
      alert("Review submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Something went wrong while submitting the review.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">
          Reviews ({worker.reviews.length})
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-sm bg-orange-500 text-white px-3 py-1 rounded"
        >
          Add Review
        </button>
      </div>

      {showForm && (
        <div className="space-y-3 mb-4">
          <div className="flex gap-1 text-3xl cursor-pointer">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={`transition-colors duration-200 ${star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            placeholder="Write your review..."
            className="border p-2 rounded w-full"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            onClick={submitReview}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Submit Review
          </button>
        </div>
      )}

      {worker.reviews.length === 0 && !showForm && (
        <p className="text-gray-500 text-sm">No reviews yet.</p>
      )}

      {worker.reviews.map((review, index) => (
        <div key={index} className="border-b py-3 last:border-none">
          <p className="font-medium">{review.name}</p>
          <p className="text-yellow-500">
            {"⭐".repeat(review.rating)}
          </p>
          <p className="text-gray-600 text-sm">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default WorkerReviews;