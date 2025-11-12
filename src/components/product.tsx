import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { NormalizedCategory, NormalizedProduct } from "../types/products";

type ProductModalProps = {
  selectedCategory: NormalizedCategory;
  selectedProduct: NormalizedProduct | null;
  onSelectProduct: (product: NormalizedProduct) => void;
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
      className="fixed inset-0 z-50 flex items-start justify-center overflow-scroll bg-black/70 px-4 py-6 backdrop-blur-sm md:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={`Productos de ${selectedCategory.name}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          closeModal();
        }
      }}
    >
      <div className="w-full max-w-5xl max-h-[calc(100vh-2rem)] overflow-y-auto rounded-2xl bg-white shadow-2xl md:max-h-[90vh]">
        <div className="flex flex-col">
          <div className="flex items-start justify-between border-b border-gray-100 px-6 py-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {selectedCategory.name}
              </h3>
              <p className="text-sm text-gray-500">
                {selectedCategory.products.length}{" "}
                {selectedCategory.products.length === 1
                  ? "producto"
                  : "productos"}
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

          <div className="flex-1 overflow-y-auto px-4 py-5 md:px-6">
            {selectedCategory.products.length > 0 ? (
              <div className="modalProducts flex flex-col gap-6 md:grid md:grid-cols-[minmax(220px,0.9fr)_minmax(360px,1.2fr)_minmax(280px,1fr)]">
                <div className="productContainer">
                  <aside className="selectMenu rounded-2xl border border-gray-100 bg-gray-50/80 p-4 md:h-full">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Otros productos
                    </p>
                    <div className="mt-3 max-h-[60vh] space-y-2 overflow-y-auto pr-1">
                      {selectedCategory.products.map((product) => {
                        const isActive = selectedProduct?.id === product.id;
                        return (
                          <button
                            key={product.id}
                            onClick={() => onSelectProduct(product)}
                            className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
                              isActive
                                ? "bg-primary text-white shadow"
                                : "text-gray-700 hover:bg-white"
                            }`}
                          >
                            {product.name}
                          </button>
                        );
                      })}
                    </div>
                  </aside>
                  <section className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white/80 p-4 md:h-full">
                    {selectedProduct ? (
                      <>
                        <div className="border-b border-gray-100 pb-4 text-center md:text-left">
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            {selectedCategory.name}
                          </p>
                          <h4 className="text-2xl font-semibold text-gray-900">
                            {selectedProduct.name}
                          </h4>
                        </div>

                        {selectedProduct.image ? (
                          <div className="flex flex-1 items-center justify-center">
                            <div className="prductImage flex aspect-square w-full max-w-md items-center justify-center overflow-hidden rounded-2xl bg-gray-100">
                              <ImageWithFallback
                                src={selectedProduct.image}
                                alt={selectedProduct.imageAlt ?? selectedProduct.name}
                                className="prductImage h-full w-full object-contain"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500">
                            Este producto todavía no cuenta con imágenes cargadas.
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-sm text-gray-600">
                        Selecciona un producto para ver sus detalles.
                      </p>
                    )}
                  </section>

                  <section className="w-400-max rounded-2xl border border-gray-100 bg-white/80 p-4 md:h-full">
                    {selectedProduct ? (
                      <>
                        <div className="mb-4 border-b border-gray-100 pb-4">
                          <h5 className="text-lg font-semibold text-gray-900">
                            Descripción
                          </h5>
                          <p className="mt-2 text-sm leading-relaxed text-gray-600">
                            {selectedProduct.description ??
                              "Estamos preparando la descripción de este producto."}
                          </p>
                        </div>

                        {selectedProduct.specs?.length ? (
                          <dl className="space-y-3">
                            {selectedProduct.specs.map(({ label, value }) => (
                              <div key={label}>
                                <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                  {label}
                                </dt>
                                <dd className="text-sm font-medium text-gray-900">
                                  {value}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        ) : null}
                      </>
                    ) : (
                      <p className="text-sm text-gray-600">
                        Selecciona un producto para ver sus detalles.
                      </p>
                    )}
                  </section>
                </div>
              </div>
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
