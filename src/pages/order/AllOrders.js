import React, { useEffect, useState } from "react";
import axios from "axios";

import { endpoint } from "../../utils/config";
import AdminPanel from "../../containers/AdminPanel";

import OrderTable from "../../components/order/OrderTable";
import DeleteOrder from "../../components/order/DeleteOrder";
import EditOrder from "../../components/order/EditOrder";
import OrderDetails from "../../components/order/OrderDetails";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // ==========================================
  // Get all orders
  // ==========================================

  const fetchData = async () => {
    try {
      const res = await axios.get(
        endpoint.getAllOrders,
        {
          withCredentials: true,
        }
      );

      setOrders(res.data);
    } catch (error) {
      console.error(
        "❌ Erreur récupération commandes :",
        error
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ==========================================
  // Delete
  // ==========================================

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        endpoint.orderById(id),
        {
          withCredentials: true,
        }
      );

      setShowDelete(false);
      setSelectedOrder(null);

      await fetchData();

    } catch (error) {
      console.error(
        "❌ Erreur suppression commande :",
        error
      );
    }
  };

  // ==========================================
  // Confirm order
  // ==========================================

  const handleConfirmOrder = async (order) => {
    try {
      await axios.put(
        endpoint.orderById(order._id),
        {
          status: "Confirmée",
        },
        {
          withCredentials: true,
        }
      );

      await fetchData();

    } catch (error) {
      console.error(
        "❌ Erreur confirmation commande :",
        error
      );

      alert(
        error.response?.data?.message ||
          "Impossible de confirmer la commande."
      );
    }
  };

  // ==========================================
  // Update order
  // ==========================================

  const handleUpdate = async (updatedOrder) => {
    try {
      await axios.put(
        endpoint.orderById(updatedOrder._id),
        updatedOrder,
        {
          withCredentials: true,
        }
      );

      setShowEdit(false);
      setSelectedOrder(null);

      await fetchData();

    } catch (error) {
      console.error(
        "❌ Erreur modification commande :",
        error
      );
    }
  };

  // ==========================================
  // Render
  // ==========================================

  return (
    <AdminPanel>

      <div className="min-h-screen flex items-start justify-center py-10">

        <div className="w-full rounded-lg shadow-gray-500 shadow-lg overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-tr from-gray-4000 to-slate-400 py-2 px-4 flex justify-between items-center">

            <h2 className="text-3xl text-blue-950 font-extrabold text-center py-4 font-serif">
              Liste des Commandes
            </h2>

          </div>

          {/* Table */}
          <div className="md:block">

            <OrderTable
              orders={orders}

              onEdit={(order) => {
                setSelectedOrder(order);
                setShowEdit(true);
              }}

              onDetails={(order) => {
                setSelectedOrder(order);
                setShowDetails(true);
              }}

              onConfirm={handleConfirmOrder}

              onDelete={(order) => {
                setSelectedOrder(order);
                setShowDelete(true);
              }}
            />

          </div>

        </div>

        {/* Delete */}
        {showDelete && (
          <DeleteOrder
            order={selectedOrder}
            onDelete={handleDelete}
            onCancel={() => {
              setShowDelete(false);
              setSelectedOrder(null);
            }}
          />
        )}

        {/* Edit */}
        {showEdit && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">

            <EditOrder
              order={selectedOrder}
              onSave={handleUpdate}
              onCancel={() => {
                setShowEdit(false);
                setSelectedOrder(null);
              }}
            />

          </div>
        )}

        {/* Details */}
        {showDetails && (
          <OrderDetails
            order={selectedOrder}
            onClose={() => {
              setShowDetails(false);
              setSelectedOrder(null);
            }}
          />
        )}

      </div>

    </AdminPanel>
  );
};

export default AllOrders;