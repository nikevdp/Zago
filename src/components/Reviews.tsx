import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Star, Quote } from "lucide-react";

type GoogleReview = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description?: string;
  time: number;
};

type ReviewsState = {
  rating: number;
  total: number;
  reviews: GoogleReview[];
};

const PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

export function Reviews() {
  const [data, setData] = useState<ReviewsState>();
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "ready">("idle");

  useEffect(() => {
    if (!PLACE_ID || !API_KEY) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    const controller = new AbortController();
    const fields = ["rating", "user_ratings_total", "reviews"].join(",");
    const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
    url.searchParams.set("placeid", PLACE_ID);
    url.searchParams.set("fields", fields);
    url.searchParams.set("key", API_KEY);

    fetch(url.toString(), { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const payload = await response.json();
        if (payload.status !== "OK" || !payload.result) {
          throw new Error(payload.error_message ?? "Place details not available");
        }

        const reviews: GoogleReview[] = Array.isArray(payload.result.reviews)
          ? payload.result.reviews.slice(0, 5)
          : [];

        setData({
          rating: payload.result.rating ?? 0,
          total: payload.result.user_ratings_total ?? reviews.length,
          reviews
        });
        setStatus("ready");
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          return;
        }
        console.error("Failed to load Google reviews", error);
        setStatus("error");
      });

    return () => {
      controller.abort();
    };
  }, [API_KEY, PLACE_ID]);

  const totalReviews = data?.total ?? 0;
  const reviews = data?.reviews ?? [];
  const averageRating = data?.rating ?? 0;
  const hasReviews = reviews.length > 0;
  const shouldShowFallback = status === "error" || (status === "ready" && !hasReviews);

  return (
    <section id="clientes" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center mb-4">
          Lo Que Dicen Nuestros Clientes
        </h2>

        {/* Puntuación de Google */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-5xl">
              {averageRating ? averageRating.toFixed(1) : "-"}
            </span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-8 h-8 ${
                    i < Math.round(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-600">
            {totalReviews
              ? `Basado en ${totalReviews} reseñas de Google`
              : "Reseñas de Google no disponibles"
            }
          </p>
        </div>

        {/* Comentarios */}
        {status === "loading" && (
          <p className="text-center text-gray-500">Cargando reseñas...</p>
        )}

        {!shouldShowFallback && hasReviews && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <Card key={`${review.author_name}-${review.time}`} className="relative">
                <CardContent className="p-6">
                  <Quote className="w-8 h-8 text-blue-600 mb-4 opacity-20" />

                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-700 mb-4">{review.text}</p>

                  <div>
                    <p className="text-gray-900">{review.author_name}</p>
                    <p className="text-gray-500 text-sm">
                      {review.relative_time_description ?? "Reseña de Google"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {shouldShowFallback && status !== "loading" && (
          <p className="text-center text-gray-500">
            No pudimos cargar las reseñas de Google en este momento.
          </p>
        )}
      </div>
    </section>
  );
}
