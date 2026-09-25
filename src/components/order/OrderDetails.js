import React from "react";

const OrderDetails = ({ order, onClose }) => {
  if (!order) return null;

  const items = order.items || [];

  const totalItems = items.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-2xl">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="flex items-center justify-between bg-gradient-to-r from-slate-400 to-blue-950 px-6 py-4">
          
          <div>
            <h2 className="text-2xl font-extrabold text-white font-serif">
              Détails de la commande
            </h2>

            <p className="mt-1 text-sm text-gray-200">
              Commande #
              {order._id
                ? order._id.slice(-8).toUpperCase()
                : "—"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white bg-opacity-20 text-xl font-bold text-white transition hover:bg-opacity-30"
          >
            ×
          </button>

        </div>

        {/* ==========================================
            CONTENT
        ========================================== */}

        <div className="space-y-6 p-6">

          {/* ==========================================
              CLIENT
          ========================================== */}

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">

            <h3 className="mb-4 border-b border-gray-200 pb-2 text-lg font-bold text-blue-950">
              👤 Informations client
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Nom complet
                </p>

                <p className="mt-1 font-semibold text-gray-800">
                  {order.customer
                    ? `${order.customer.firstName || ""} ${
                        order.customer.lastName || ""
                      }`
                    : "—"}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Téléphone
                </p>

                <p className="mt-1 font-semibold text-gray-800">
                  {order.customer?.phone || "—"}
                </p>
              </div>

              <div className="md:col-span-2">
                <p className="text-sm font-semibold text-gray-500">
                  Adresse
                </p>

                <p className="mt-1 font-semibold text-gray-800">
                  {order.customer?.address || "—"}
                </p>
              </div>

            </div>
          </div>

          {/* ==========================================
              STATUT
          ========================================== */}

          <div className="rounded-lg border border-gray-200 p-5">

            <h3 className="mb-4 border-b border-gray-200 pb-2 text-lg font-bold text-blue-950">
              📋 Informations commande
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Statut
                </p>

                <span
                  className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-bold ${
                    order.status === "Confirmée"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Annulée"
                      ? "bg-red-100 text-red-700"
                      : order.status === "Expédiée"
                      ? "bg-blue-100 text-blue-700"
                      : order.status === "Livrée"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status || "En attente"}
                </span>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Nombre d'articles
                </p>

                <p className="mt-1 font-bold text-gray-800">
                  {totalItems}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Date
                </p>

                <p className="mt-1 font-semibold text-gray-800">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString(
                        "fr-FR"
                      )
                    : "—"}
                </p>
              </div>

            </div>
          </div>

          {/* ==========================================
              ARTICLES
          ========================================== */}

          <div className="rounded-lg border border-gray-200 p-5">

            <h3 className="mb-4 border-b border-gray-200 pb-2 text-lg font-bold text-blue-950">
              📦 Articles commandés
            </h3>

            {items.length === 0 ? (
              <p className="py-6 text-center text-gray-500">
                Aucun article dans cette commande.
              </p>
            ) : (
              <div className="space-y-4">

                {items.map((item, index) => {
                  const quantity = Number(item.quantity || 0);
                  const price = Number(item.price || 0);
                  const subtotal = quantity * price;

                  return (
                    <div
                      key={`${item.productId || "item"}-${index}`}
                      className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                    >

                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                        {/* Product */}
                        <div className="flex-1">

                          <p className="text-base font-bold text-blue-950">
                            {index + 1}. {item.name || "Produit"}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            Prix unitaire :{" "}
                            <span className="font-semibold text-gray-700">
                              {price.toFixed(2)} Dt
                            </span>
                          </p>

                        </div>

                        {/* Quantity */}
                        <div className="md:text-center">

                          <p className="text-xs font-semibold uppercase text-gray-500">
                            Quantité
                          </p>

                          <p className="font-bold text-gray-800">
                            {quantity}
                          </p>

                        </div>

                        {/* Subtotal */}
                        <div className="md:text-right">

                          <p className="text-xs font-semibold uppercase text-gray-500">
                            Sous-total
                          </p>

                          <p className="font-bold text-blue-950">
                            {subtotal.toFixed(2)} Dt
                          </p>

                        </div>

                      </div>

                    </div>
                  );
                })}

              </div>
            )}
          </div>

          {/* ==========================================
              TOTAL
          ========================================== */}

          <div className="rounded-lg bg-blue-950 p-5 text-white">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-300">
                  Total de la commande
                </p>

                <p className="mt-1 text-lg font-semibold">
                  {totalItems} article
                  {totalItems > 1 ? "s" : ""}
                </p>
              </div>

              <p className="text-2xl font-extrabold">
                {Number(order.total || 0).toFixed(2)} Dt
              </p>

            </div>

          </div>

        </div>

        {/* ==========================================
            FOOTER
        ========================================== */}

        <div className="flex justify-end border-t border-gray-200 bg-gray-50 px-6 py-4">

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-blue-950 px-6 py-2 font-semibold text-white transition hover:bg-blue-900"
          >
            Fermer
          </button>

        </div>

      </div>
    </div>
  );
};

export default OrderDetails;