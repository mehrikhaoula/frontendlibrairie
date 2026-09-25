import React, { useMemo, useState } from "react";

const UserTable = ({ users, onEdit, onDelete }) => {
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) {
      return users || [];
    }

    return (users || []).filter((user) => {
      const firstName = user.firstname || "";
      const lastName = user.lastname || "";
      const fullName = `${firstName} ${lastName}`;

      return (
        firstName.toLowerCase().includes(searchText) ||
        lastName.toLowerCase().includes(searchText) ||
        fullName.toLowerCase().includes(searchText)
      );
    });
  }, [users, search]);

  return (
    <div className="w-full">

      {/* Recherche */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Rechercher par nom ou prénom..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Tableau */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">

          <thead>
            <tr className="bg-gradient-to-r from-slate-400 to-blue-950 text-white">

              <th className="px-6 py-3 text-xl font-serif font-extrabold text-left">
                #
              </th>

              <th className="px-6 py-3 text-xl font-serif font-extrabold text-left">
                Nom
              </th>

              <th className="px-6 py-3 text-xl font-serif font-extrabold text-left">
                Email
              </th>

              <th className="px-6 py-3 text-xl font-serif font-extrabold text-left">
                Action
              </th>

            </tr>
          </thead>

          <tbody>

            {filteredUsers.length > 0 ? (

              filteredUsers.map((user, index) => (

                <tr
                  key={user._id}
                  className={`${
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-200"
                  } hover:bg-gray-100 transition-colors duration-150`}
                >

                  <td className="px-6 py-4 text-gray-700">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4 text-gray-700">
                    {user.firstname} {user.lastname}
                  </td>

                  <td className="px-6 py-4 text-gray-700">
                    {user.email}
                  </td>

                  <td className="px-6 py-4">

                    <button
                      onClick={() => onEdit(user)}
                      className="text-blue-600 mr-2 hover:underline"
                    >
                      Modifier
                    </button>

                    <button
                      onClick={() => onDelete(user)}
                      className="text-red-600 hover:underline"
                    >
                      Supprimer
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-8 text-center text-gray-500"
                >
                  Aucun utilisateur trouvé.
                </td>
              </tr>

            )}

          </tbody>

        </table>
      </div>
    </div>
  );
};

export default UserTable;