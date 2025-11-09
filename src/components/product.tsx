import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { NormalizedCategory, SubProduct } from "../types/products";

type ProductModalProps = {
  selectedCategory: NormalizedCategory;
  selectedProduct: SubProduct | null;
  onSelectProduct: (product: SubProduct) => void;
  closeModal: () => void;
};

export function ProductModal({
  selectedCategory,
  selectedProduct,
  onSelectProduct,
  closeModal,
}: ProductModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Productos de ${selectedCategory.name}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          closeModal();
        }
      }}
    >
      <div className="h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl md:h-auto md:max-h-[90vh]">
        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between border-b border-gray-100 px-6 py-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {selectedCategory.name}
              </h3>
              <p className="text-sm text-gray-600">
                {selectedCategory.description}
              </p>
            </div>
            <button
              onClick={closeModal}
              className="ml-4 rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              aria-label="Cerrar"
            >
              X
            </button>
          </div>

          <div className="flex flex-1 gap-6 overflow-y-auto px-6 py-5 md:flex-row md:overflow-visible productInfoContainer">
            {selectedCategory.products.length > 0 ? (
              <>
                <div className="max-h-[60vh] w-600px overflow-y-auto rounded-xl border border-gray-100 bg-gray-50/60 p-4 md:w-2/5">
                  <ul className="flex flex-col gap-2">
                    {selectedCategory.products.map((product) => {
                      const isActive = selectedProduct?.id === product.id;
                      return (
                        <li key={product.id}>
                          <button
                            onClick={() => onSelectProduct(product)}
                            className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
                              isActive
                                ? "bg-primary text-white shadow"
                                : "text-gray-700 hover:bg-white"
                            }`}
                          >
                            {product.name}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
                  {selectedProduct ? (
                    <>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {selectedProduct.name}
                        </h4>
                        <p className="mt-2 text-sm text-gray-600">
                          {selectedProduct.description}
                        </p>
                      </div>
                      <div className="flex h-[400px] w-[400px] items-center justify-center overflow-hidden rounded-2xl bg-gray-100">
                        <ImageWithFallback
                          src={selectedProduct.image}
                          alt={selectedProduct.name}
                          className="h-600px w-600px object-cover"
                        />
                      </div>
                      
                    </>
                  ) : (
                    <p className="text-sm text-gray-600">
                      Selecciona un producto para ver sus detalles.
                    </p>
                  )}
                </div>
              </>
            ) : (
              <p className="w-full text-center text-sm text-gray-600">
                No hay productos registrados para esta categoría todavía.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
