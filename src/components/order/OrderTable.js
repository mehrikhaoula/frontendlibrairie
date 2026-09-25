import React, { useMemo, useState } from "react";

const OrderTable = ({
  orders,
  onEdit,
  onDelete,
  onDetails,
  onConfirm,
}) => {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filtre du mois UNIQUEMENT pour le total des commandes livrées
  const [deliveredMonth, setDeliveredMonth] = useState("");

  // =========================
  // FILTRE + TRI COMMANDES
  // =========================
  const filteredOrders = useMemo(() => {
    let result = [...(orders || [])];

    // Recherche par nom / prénom
    if (search.trim()) {
      const searchText = search.toLowerCase().trim();

      result = result.filter((order) => {
        const firstName = order.customer?.firstName || "";
        const lastName = order.customer?.lastName || "";
        const fullName = `${firstName} ${lastName}`.toLowerCase();

        return (
          firstName.toLowerCase().includes(searchText) ||
          lastName.toLowerCase().includes(searchText) ||
          fullName.includes(searchText)
        );
      });
    }

    // Filtre par date
    if (dateFilter) {
      result = result.filter((order) => {
        if (!order.createdAt) return false;

        const orderDate = new Date(order.createdAt)
          .toISOString()
          .split("T")[0];

        return orderDate === dateFilter;
      });
    }

    // Filtre par statut
    if (statusFilter !== "all") {
      result = result.filter(
        (order) => order.status === statusFilter
      );
    }

    // Tri par date
    result.sort((a, b) => {
      const dateA = new Date(
        a.createdAt || 0
      ).getTime();

      const dateB = new Date(
        b.createdAt || 0
      ).getTime();

      if (sortOrder === "newest") {
        return dateB - dateA;
      }

      return dateA - dateB;
    });

    return result;
  }, [
    orders,
    search,
    sortOrder,
    dateFilter,
    statusFilter,
  ]);

  // =========================
  // TOTAL COMMANDES LIVRÉES
  // =========================
  const deliveredStats = useMemo(() => {
    let deliveredOrders = (orders || []).filter(
      (order) => order.status === "Livrée"
    );

    // Le filtre mois agit UNIQUEMENT ici
    if (deliveredMonth) {
      deliveredOrders = deliveredOrders.filter(
        (order) => {
          if (!order.createdAt) return false;

          const date = new Date(order.createdAt);

          const year = date.getFullYear();

          const month = String(
            date.getMonth() + 1
          ).padStart(2, "0");

          return `${year}-${month}` === deliveredMonth;
        }
      );
    }

    const total = deliveredOrders.reduce(
      (sum, order) =>
        sum + Number(order.total || 0),
      0
    );

    return {
      count: deliveredOrders.length,
      total,
    };
  }, [orders, deliveredMonth]);

  // =========================
  // RESET FILTRES COMMANDES
  // =========================
  const resetFilters = () => {
    setSearch("");
    setSortOrder("newest");
    setDateFilter("");
    setStatusFilter("all");
  };

  return (
    <div className="w-full">

      {/* =========================
          FILTRES COMMANDES
      ========================= */}
      <div className="mb-6 rounded-2xl bg-white p-5 shadow-md border border-gray-200">

        <div className="flex flex-col lg:flex-row gap-4 items-end">

          {/* Recherche client */}
          <div className="w-full lg:flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Rechercher un client
            </label>

            <input
              type="text"
              placeholder="Nom ou prénom..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Tri */}
          <div className="w-full lg:w-64">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Trier par date
            </label>

            <select
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value)
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
            >
              <option value="newest">
                Plus récentes → anciennes
              </option>

              <option value="oldest">
                Plus anciennes → récentes
              </option>
            </select>
          </div>

          {/* Date */}
          <div className="w-full lg:w-56">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Date
            </label>

            <input
              type="date"
              value={dateFilter}
              onChange={(e) =>
                setDateFilter(e.target.value)
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Statut */}
          <div className="w-full lg:w-52">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Statut
            </label>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">
                Tous les statuts
              </option>

              <option value="En attente">
                En attente
              </option>

              <option value="Confirmée">
                Confirmée
              </option>

              <option value="Expédiée">
                Expédiée
              </option>

              <option value="Livrée">
                Livrée
              </option>

              <option value="Annulée">
                Annulée
              </option>
            </select>
          </div>

          {/* Reset */}
          <button
            onClick={resetFilters}
            className="w-full lg:w-auto rounded-xl bg-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-300"
          >
            Réinitialiser
          </button>

        </div>

        {/* Résultat */}
        <div className="mt-4 text-sm text-gray-500">
          {filteredOrders.length} commande
          {filteredOrders.length !== 1
            ? "s"
            : ""}
        </div>
      </div>

      {/* =========================
          STATISTIQUES LIVRAISONS
      ========================= */}
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-green-50 to-white p-5 shadow-md border border-green-100">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

          {/* Informations */}
          <div>
            <p className="text-sm font-semibold text-green-700">
              Commandes livrées
            </p>

            <p className="mt-1 text-2xl font-bold text-blue-950">
              {deliveredStats.total.toFixed(2)} Dt
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {deliveredStats.count} commande
              {deliveredStats.count !== 1
                ? "s"
                : ""}{" "}
              livrée
              {deliveredStats.count !== 1
                ? "s"
                : ""}
            </p>
          </div>

          {/* Filtre mois indépendant */}
          <div className="w-full md:w-64 mx-20">

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Voir le total par mois
            </label>

            <input
              type="month"
              value={deliveredMonth}
              onChange={(e) =>
                setDeliveredMonth(e.target.value)
              }
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />

            {deliveredMonth && (
              <button
                onClick={() => setDeliveredMonth("")}
                className="mt-2 text-xs font-semibold text-gray-500 hover:text-gray-800"
              >
                Afficher tous les mois
              </button>
            )}

          </div>

        </div>
      </div>

      {/* =========================
          TABLE
      ========================= */}
      <div className="w-full overflow-x-auto rounded-xl">

        <table className="min-w-full table-auto border-collapse">

          <thead>
            <tr className="bg-gradient-to-r from-slate-400 to-blue-950 text-white">

              <th className="px-6 py-3 text-xl font-serif font-extrabold text-left">
                #
              </th>

              <th className="px-6 py-3 text-xl font-serif font-extrabold text-left">
                Client
              </th>

              <th className="px-6 py-3 text-xl font-serif font-extrabold text-left">
                Téléphone
              </th>

              <th className="px-6 py-3 text-xl font-serif font-extrabold text-left">
                Adresse
              </th>

              <th className="px-6 py-3 text-xl font-serif font-extrabold text-left">
                Date
              </th>

              <th className="px-6 py-3 text-xl font-serif font-extrabold text-left">
                Statut
              </th>

              <th className="px-6 py-3 text-xl font-serif font-extrabold text-left">
                Paiement
              </th>

              <th className="px-6 py-3 text-xl font-serif font-extrabold text-left">
                Total
              </th>

              <th className="px-6 py-3 text-xl font-serif font-extrabold text-left">
                Action
              </th>

            </tr>
          </thead>

          <tbody>

            {filteredOrders.length > 0 ? (

              filteredOrders.map((order, index) => (

                <tr
                  key={order._id}
                  className={`${
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-200"
                  } hover:bg-gray-100 transition-colors duration-150`}
                >

                  {/* # */}
                  <td className="px-6 py-4 text-sm font-serif text-gray-700">
                    {index + 1}
                  </td>

                  {/* Client */}
                  <td className="px-6 py-4 text-sm text-gray-700 font-semibold">
                    {order.customer
                      ? `${order.customer.firstName} ${order.customer.lastName}`
                      : "Client inconnu"}
                  </td>

                  {/* Téléphone */}
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {order.customer?.phone || "—"}
                  </td>

                  {/* Adresse */}
                  <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">
                    {order.customer?.address ||
                      "Adresse inconnue"}
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                    {order.createdAt
                      ? new Date(
                          order.createdAt
                        ).toLocaleDateString(
                          "fr-FR",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )
                      : "—"}
                  </td>

                  {/* Statut */}
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {order.status ||
                      "En attente"}
                  </td>

                  {/* Paiement */}
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <div>
                      {order.paymentStatus ||
                        "—"}
                    </div>

                    <div className="text-xs text-gray-500">
                      {order.paymentMethod ||
                        "—"}
                    </div>
                  </td>

                  {/* Total */}
                  <td className="px-6 py-4 text-sm font-bold text-blue-950 whitespace-nowrap">
                    {Number(
                      order.total || 0
                    ).toFixed(2)}{" "}
                    Dt
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-sm whitespace-nowrap">

                    <button
                      className="text-blue-700 hover:text-blue-950 hover:underline mr-4 transition-colors duration-150"
                      onClick={() =>
                        onDetails(order)
                      }
                    >
                      détails
                    </button>

                    {order.status ===
                      "En attente" && (
                      <button
                        className="text-green-700 hover:text-green-900 hover:underline mr-4 transition-colors duration-150"
                        onClick={() =>
                          onConfirm(order)
                        }
                      >
                        confirmer
                      </button>
                    )}

                    <button
                      className="text-indigo-600 hover:text-indigo-900 hover:underline mr-4 transition-colors duration-150"
                      onClick={() =>
                        onEdit(order)
                      }
                    >
                      modifier
                    </button>

                    <button
                      className="text-red-700 hover:text-red-900 hover:underline"
                      onClick={() =>
                        onDelete(order)
                      }
                    >
                      supprimer
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td
                  colSpan="9"
                  className="px-6 py-10 text-center text-gray-500"
                >
                  Aucune commande trouvée.
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>
    </div>
  );
};

export default OrderTable;