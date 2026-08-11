"use client";
import ButtonComponent from "@app/components/button";
import SearchBarComponent from "@app/components/searchBar";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Pencil, Trash2 } from "lucide-react";
import AddElementModal, {
  FormFieldConfig,
  InitialDataType,
} from "@app/components/addElement";
import { DeleteUser, FetchUsers, UpdateRole } from "@app/actions/Users";
import { RegisterUser } from "@app/actions/Auth";
import { Product } from "@app/interfaces";
import LoadingComponent from "@app/components/loadingComponent";
import ConfirmModal from "@app/components/ConfirmModal";
import { toast } from "@app/components/FormComponent";
import { useTranslations } from "next-intl";

export interface UserInterface {
  id?: string;
  username?: string;
  first_name: string;
  last_name: string;
  email: string;
  roles: string;
  password?: string;
}

export default function Utilisateurs() {
  const t = useTranslations("UsersPage");

  const [inputValue, setInputValue] = useState("");
  const [addUser, setAddUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectUserId, setSelectUserId] = useState<string | undefined>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | undefined>(
    undefined,
  );
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Configuration des champs du formulaire de création mémoïsée avec traductions
  const userFields: FormFieldConfig[] = useMemo(
    () => [
      {
        name: "username",
        label: t("fields.username.label"),
        type: "text",
        placeholder: t("fields.username.placeholder"),
        required: true,
      },
      {
        name: "first_name",
        label: t("fields.firstName.label"),
        type: "text",
        placeholder: t("fields.firstName.placeholder"),
        required: true,
      },
      {
        name: "last_name",
        label: t("fields.lastName.label"),
        type: "text",
        placeholder: t("fields.lastName.placeholder"),
        required: true,
      },
      {
        name: "email",
        label: t("fields.email.label"),
        type: "email",
        placeholder: t("fields.email.placeholder"),
        required: true,
      },
      {
        name: "roles",
        label: t("fields.role.label"),
        type: "select",
        options: [
          { value: "Administrateur", label: t("fields.role.options.admin") },
          { value: "Utilisateur", label: t("fields.role.options.user") },
        ],
        required: true,
      },
      {
        name: "password",
        label: t("fields.password.label"),
        type: "password",
        placeholder: t("fields.password.placeholder"),
        required: true,
      },
    ],
    [t],
  );

  // Configuration des champs du formulaire d'édition mémoïsée avec traductions
  const roleFields: FormFieldConfig[] = useMemo(
    () => [
      {
        name: "roles",
        label: t("fields.role.label"),
        type: "select",
        options: [
          { value: "ROLE_ADMIN", label: t("fields.role.options.admin") },
          { value: "ROLE_VIEWER", label: t("fields.role.options.user") },
        ],
        required: true,
      },
      {
        name: "password",
        label: t("fields.password.label"),
        type: "password",
        placeholder: t("fields.password.placeholder"),
        required: false,
      },
    ],
    [t],
  );

  const handleAddUser = useCallback(() => {
    setAddUser(true);
  }, []);

  const handleSubmitUser = useCallback(
    async (formData: UserInterface | Product | InitialDataType) => {
      try {
        const newUser = await RegisterUser(formData as UserInterface);
        if (newUser && "id" in newUser) {
          setUsers((prevUsers) => [...prevUsers, newUser as UserInterface]);
          setAddUser(false);
          toast(true, false, t("toasts.addSuccess"));
        } else {
          toast(false, false, t("toasts.addError"));
        }
      } catch (err) {
        console.error("erreur lors de l'appel addUser : ", err);
        toast(false, false, t("toasts.addError"));
      }
    },
    [t],
  );

  const handleEdit = useCallback(
    (userId: string | undefined, userRole: string) => {
      setSelectedUser(userRole);
      setSelectUserId(userId);
      setEditUser(true);
    },
    [],
  );

  const handleSubmitEditUser = useCallback(
    async (formData: UserInterface | Product | InitialDataType) => {
      try {
        const updatedUser = await UpdateRole(
          selectUserId,
          (formData as UserInterface).roles,
        );
        if (updatedUser) {
          setUsers((prevUsers) =>
            prevUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
          );
          setEditUser(false);
          toast(true, false, t("toasts.updateSuccess"));
        } else {
          toast(false, false, t("toasts.updateError"));
        }
      } catch (err) {
        console.error("erreur lors de l'appel updateRole : ", err);
        toast(false, false, t("toasts.updateError"));
      }
    },
    [selectUserId, t],
  );

  const handleDelete = useCallback((userId: string | undefined) => {
    setUserToDelete(userId);
    setIsDeleteModalOpen(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!userToDelete) return;
    setIsDeleteModalOpen(false);
    try {
      const deletedUser = await DeleteUser(userToDelete);
      if (deletedUser) {
        setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userToDelete));
        toast(true, false, t("toasts.deleteSuccess"));
      } else {
        toast(false, false, t("toasts.deleteError"));
      }
    } catch (err) {
      console.error("erreur lors de l'appel deleteUser : ", err);
      toast(false, false, t("toasts.deleteError"));
    } finally {
      setUserToDelete(undefined);
    }
  }, [userToDelete, t]);

  const handleCloseLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleCloseAddModal = useCallback(() => {
    setAddUser(false);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setEditUser(false);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const response = await FetchUsers();
        if (response) {
          setUsers(response);
        }
      } catch (err) {
        console.error(
          "erreur lors de la recuperations des utilisateurs : ",
          err,
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user &&
        (user.first_name.toLowerCase().includes(inputValue.toLowerCase()) ||
          user.email.toLowerCase().includes(inputValue.toLowerCase()) ||
          user.last_name.toLowerCase().includes(inputValue.toLowerCase())),
    );
  }, [users, inputValue]);

  const initialData = useMemo(() => {
    if (selectedUser && selectUserId) {
      return {
        roles: selectedUser,
        id: selectUserId,
      };
    }
    return {};
  }, [selectedUser, selectUserId]);

  return (
    <div className="min-h-screen font-sans p-4 md:p-6 lg:p-8">
      <LoadingComponent isOpen={isLoading} onClose={handleCloseLoading} />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-4 w-full">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-light text-white m-0">
          {t("title")}
        </h1>
        <ButtonComponent textButton={t("addButton")} onclick={handleAddUser} />
      </div>

      <div className="mb-4 md:mb-6 w-full md:w-1/2">
        <SearchBarComponent
          placeholder={t("searchPlaceholder")}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      </div>

      {/* Vue Mobile */}
      <div className="md:hidden">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user: UserInterface) => (
            <div
              key={user.id}
              className="bg-[#22415bff] rounded-lg p-4 mb-4 backdrop-blur-sm text-white"
            >
              <div className="flex justify-between mb-2 text-sm">
                <span className="font-semibold text-white/70">
                  {t("table.names")} :
                </span>
                <span className="text-white">{`${user.first_name} ${user.last_name}`}</span>
              </div>
              <div className="flex justify-between mb-2 text-sm">
                <span className="font-semibold text-white/70">
                  {t("table.email")} :
                </span>
                <span className="text-white">{user.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-white/70">
                  {t("table.role")} :
                </span>
                <span className="text-white">{user.roles}</span>
              </div>
              <div className="flex gap-3 justify-end mt-4 pt-4 border-t border-white/20">
                <button
                  className="p-1 flex items-center justify-center transition-colors duration-200 text-white hover:text-blue-400"
                  onClick={() => handleEdit(user.id, user.roles)}
                  aria-label={t("actions.edit")}
                >
                  <Pencil size={18} />
                </button>
                <button
                  className="p-1 flex items-center justify-center transition-colors duration-200 text-white hover:text-red-500"
                  onClick={() => handleDelete(user.id)}
                  aria-label={t("actions.delete")}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-white text-center p-8">{t("noUsersFound")}</div>
        )}
      </div>

      {/* Vue Desktop */}
      <div className="hidden md:block bg-[#50789B] rounded-xl overflow-hidden backdrop-blur-sm shadow-xl">
        <table className="w-full border-collapse text-white">
          <thead>
            <tr>
              <th className="text-left py-4 px-4 text-base font-semibold border-b border-white/30">
                {t("table.names")}
              </th>
              <th className="text-left py-4 px-4 text-base font-semibold border-b border-white/30">
                {t("table.email")}
              </th>
              <th className="text-left py-4 px-4 text-base font-semibold border-b border-white/30">
                {t("table.role")}
              </th>
              <th className="text-right py-4 px-4 text-base font-semibold border-b border-white/30">
                {t("table.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-white/10 transition duration-150 ease-in-out"
                >
                  <td className="py-4 px-4 text-base border-b border-white/20">{`${user.first_name} ${user.last_name}`}</td>
                  <td className="py-4 px-4 text-base border-b border-white/20">
                    {user.email}
                  </td>
                  <td className="py-4 px-4 text-base border-b border-white/20">
                    {user.roles}
                  </td>
                  <td className="flex gap-2 justify-end items-center py-4 px-4 border-b border-white/20">
                    <button
                      className="p-1 flex items-center justify-center transition-colors duration-200 text-white hover:text-blue-400"
                      onClick={() => handleEdit(user.id, user.roles)}
                      aria-label={t("actions.edit")}
                    >
                      <Pencil size={20} />
                    </button>
                    <button
                      className="p-1 flex items-center justify-center transition-colors duration-200 text-white hover:text-red-500"
                      onClick={() => handleDelete(user.id)}
                      aria-label={t("actions.delete")}
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-8 px-4 text-center text-base">
                  {t("noUsersFound")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AddElementModal
        isOpen={addUser}
        onClose={handleCloseAddModal}
        onSubmit={handleSubmitUser}
        titleComponent={t("modals.addUser.title")}
        buttonTitle={t("modals.addUser.submitButton")}
        fields={userFields}
        initialData={{
          username: "",
          email: "",
          first_name: "",
          last_name: "",
          roles: "",
        }}
      />

      <AddElementModal
        isOpen={editUser}
        onClose={handleCloseEditModal}
        onSubmit={handleSubmitEditUser}
        titleComponent={t("modals.editUser.title")}
        buttonTitle={t("modals.editUser.submitButton")}
        fields={roleFields}
        initialData={initialData}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={confirmDelete}
        title={t("modals.deleteConfirm.title")}
      />
    </div>
  );
}
