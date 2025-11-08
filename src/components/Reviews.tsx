import { Card, CardContent } from "./ui/card";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "María González",
    rating: 5,
    comment: "Excelente servicio y productos de calidad. Muy satisfecha con mi compra, superó todas mis expectativas.",
    date: "Hace 2 semanas"
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    rating: 5,
    comment: "Profesionales en su trabajo. La atención al cliente es excepcional y los tiempos de entrega son perfectos.",
    date: "Hace 1 mes"
  },
  {
    id: 3,
    name: "Ana Martínez",
    rating: 5,
    comment: "Muy recomendable. Los productos son de primera calidad y el equipo es muy atento a los detalles.",
    date: "Hace 3 semanas"
  }
];

export function Reviews() {
  const averageRating = 4.9;
  const totalReviews = 127;

  return (
    <section id="clientes" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center mb-4">
          Lo Que Dicen Nuestros Clientes
        </h2>
        
        {/* Puntuación de Google */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-5xl">{averageRating}</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-8 h-8 ${
                    i < Math.floor(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-600">
            Basado en {totalReviews} reseñas de Google
          </p>
        </div>

        {/* Comentarios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="relative">
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
                
                <p className="text-gray-700 mb-4">{review.comment}</p>
                
                <div>
                  <p className="text-gray-900">{review.name}</p>
                  <p className="text-gray-500 text-sm">{review.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
