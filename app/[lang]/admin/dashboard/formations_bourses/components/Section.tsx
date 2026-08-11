"use client";
import React, { useState, CSSProperties, useEffect, useCallback } from "react";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { showToast } from "nextjs-toast-notify";
import {
  FetchTrainings,
  AddTraining,
  UpdateTraining,
  DeleteTraining,
} from "@app/actions/Trainings";
import {
  FetchScholarships,
  AddScholarship,
  UpdateScholarship,
  DeleteScholarship,
  IScholarship,
} from "@app/actions/Scholarships";
import { ITraining } from "@app/interfaces";
import ConfirmModal from "@app/components/ConfirmModal";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const EditorText = dynamic(() => import("@app/components/titap"), {
  ssr: false,
});

export const toast = function (
  success: boolean,
  edit: boolean = false,
  message: string = "",
) {
  return success
    ? showToast.success(message, {
        duration: 4000,
        progress: true,
        position: "bottom-center",
        transition: "bounceIn",
        icon: "✅",
        sound: true,
      })
    : showToast.error(message, {
        duration: 4000,
        progress: true,
        position: "bottom-center",
        transition: "bounceIn",
        icon: "❌",
        sound: true,
      });
};

type TabType = "Bourses" | "Formations";
type DataItem = ITraining | IScholarship;

interface FormData {
  title: string;
  url?: string;
  description: string;
  date: string;
  reward: string;
  type: "CLASSIC" | "ACADEMY";
  file?: File;
}

const tabContainer: CSSProperties = {
  display: "flex",
  gap: "30px",
  marginBottom: "40px",
  borderBottom: "2px solid rgba(255, 255, 255, 0.3)",
};
const tabStyle: CSSProperties = {
  color: "white",
  fontSize: "16px",
  padding: "12px 0",
  background: "none",
  border: "none",
  cursor: "pointer",
  fontWeight: "500",
  borderBottom: "3px solid transparent",
};
const activeTabStyle: CSSProperties = {
  borderBottom: "3px solid #E67E5F",
  fontWeight: "bold",
  borderBottomColor: "#E67E5F",
};
const baseInputStyle: CSSProperties = {
  padding: "12px 16px",
  borderRadius: "8px",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  color: "white",
  fontSize: "14px",
  outline: "none",
};
const buttonStyle: CSSProperties = {
  padding: "12px 40px",
  backgroundColor: "#E67E5F",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
};

const formatDateFR = (dateString: string | Date) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function SwitchSection() {
  const t = useTranslations("SwitchSection");

  const [activeTab, setActiveTab] = useState<TabType>("Bourses");
  const [items, setItems] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const [inputMode, setInputMode] = useState<"url" | "reward">("url");

  const [formData, setFormData] = useState<FormData>({
    title: "",
    url: "",
    description: "",
    date: "",
    reward: "",
    type: "CLASSIC",
    file: undefined,
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === "Bourses") {
        const data = await FetchScholarships();
        setItems(data || []);
      } else {
        const data = await FetchTrainings();
        setItems(data || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setIsModalOpen(false);
    const success =
      activeTab === "Bourses"
        ? await DeleteScholarship(itemToDelete)
        : await DeleteTraining(itemToDelete);
    if (success) {
      toast(true, false, t("messages.deletedSuccess"));
      loadData();
    } else {
      toast(false, false, t("messages.deleteError"));
    }
    setItemToDelete(null);
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      toast(false, false, t("messages.fillTitleAndDesc"));
      return;
    }
    setLoading(true);
    let res;
    const isEditing = !!editingId;

    if (activeTab === "Bourses") {
      const payload: IScholarship = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        ...(inputMode === "url" ? { lien: formData.url } : {}),
        ...(inputMode === "reward" ? { reward: Number(formData.reward) } : {}),
      };
      res = isEditing
        ? await UpdateScholarship(editingId as string, payload)
        : await AddScholarship(payload);
    } else {
      const payload: ITraining = {
        title: formData.title,
        lien: formData.url || "",
        description: formData.description,
        date: formData.date,
        type: formData.type,
        file: formData.file,
      };
      res = isEditing
        ? await UpdateTraining(editingId as string, payload)
        : await AddTraining(payload);
    }

    if (res?.success) {
      const defaultSuccessMsg = isEditing
        ? t("messages.updatedSuccess")
        : t("messages.publishedSuccess");
      toast(true, isEditing, defaultSuccessMsg);
      setEditingId(null);
      setFormData({
        title: "",
        url: "",
        description: "",
        date: "",
        reward: "",
        type: "CLASSIC",
        file: undefined,
      });
      await loadData();
    } else {
      // @ts-expect-error: res may not have an 'error' property depending on the API response shape
      toast(false, false, res?.error || t("messages.operationFailed"));
    }
    setLoading(false);
  };

  const handleEditClick = (item: DataItem) => {
    setEditingId(item.id || null);

    if ("reward" in item && item.reward) {
      setInputMode("reward");
    } else {
      setInputMode("url");
    }

    setFormData({
      title: item.title,
      url: item.lien || "",
      description: item.description,
      date:
        typeof item.date === "string"
          ? item.date.split("T")[0]
          : new Date(item.date).toISOString().split("T")[0],
      reward: "reward" in item && item.reward ? String(item.reward) : "",
      type: "type" in item ? (item as ITraining).type : "CLASSIC",
      file: undefined,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      style={{
        backgroundColor: "#5A8FAC",
        minHeight: "100vh",
        padding: isMobile ? "20px" : "40px",
      }}
    >
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        title={t("messages.confirmDelete")}
      />

      <div style={tabContainer}>
        {(["Bourses", "Formations"] as const).map((tab) => (
          <button
            key={tab}
            style={{
              ...tabStyle,
              ...(activeTab === tab ? activeTabStyle : {}),
            }}
            onClick={() => {
              setActiveTab(tab);
              setEditingId(null);
              setFormData({
                title: "",
                url: "",
                description: "",
                date: "",
                reward: "",
                type: "CLASSIC",
                file: undefined,
              });
            }}
          >
            {tab === "Bourses" ? t("tabs.scholarships") : t("tabs.trainings")}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: "60px" }}>
        <h2
          style={{
            marginBottom: "30px",
            fontSize: "24px",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {editingId
            ? activeTab === "Bourses"
              ? t("titles.editScholarship")
              : t("titles.editTraining")
            : activeTab === "Bourses"
              ? t("titles.addScholarship")
              : t("titles.addTraining")}
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <label style={{ fontSize: "14px", color: "white" }}>
              {t("labels.title")}
            </label>
            <input
              type="text"
              placeholder={t("placeholders.title")}
              style={baseInputStyle}
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {activeTab === "Formations" && (
            <div
              style={{
                flex: 0.5,
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <label style={{ fontSize: "14px", color: "white" }}>
                {t("labels.trainingType")}
              </label>
              <select
                style={{
                  ...baseInputStyle,
                  color: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  appearance: "none",
                  cursor: "pointer",
                }}
                value={formData.type}
                onChange={(e) => {
                  const newType = e.target.value as "CLASSIC" | "ACADEMY";
                  setFormData({
                    ...formData,
                    type: newType,
                    url:
                      newType === "ACADEMY"
                        ? "https://actuscientifique.com/en/opportunities/science-academy"
                        : formData.url,
                  });
                }}
              >
                <option
                  value="CLASSIC"
                  style={{ color: "black", backgroundColor: "white" }}
                >
                  {t("options.classic")}
                </option>
                <option
                  value="ACADEMY"
                  style={{ color: "black", backgroundColor: "white" }}
                >
                  {t("options.academy")}
                </option>
              </select>
            </div>
          )}

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <label style={{ fontSize: "14px", color: "white" }}>
                {activeTab === "Bourses"
                  ? t("labels.infoToProvide")
                  : t("labels.trainingLink")}
              </label>

              {activeTab === "Bourses" && (
                <div style={{ display: "flex", gap: "12px" }}>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      cursor: "pointer",
                      fontSize: "12px",
                      opacity: 0.9,
                      color: "white",
                    }}
                  >
                    <input
                      type="radio"
                      checked={inputMode === "url"}
                      onChange={() => setInputMode("url")}
                    />
                    {t("labels.link")}
                  </label>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      cursor: "pointer",
                      fontSize: "12px",
                      opacity: 0.9,
                      color: "white",
                    }}
                  >
                    <input
                      type="radio"
                      checked={inputMode === "reward"}
                      onChange={() => setInputMode("reward")}
                    />
                    {t("labels.amount")}
                  </label>
                </div>
              )}
            </div>

            {activeTab === "Bourses" ? (
              inputMode === "url" ? (
                <input
                  type="text"
                  placeholder={t("placeholders.scholarshipUrl")}
                  style={baseInputStyle}
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                />
              ) : (
                <input
                  type="number"
                  placeholder={t("placeholders.scholarshipAmount")}
                  style={baseInputStyle}
                  value={formData.reward}
                  onChange={(e) =>
                    setFormData({ ...formData, reward: e.target.value })
                  }
                />
              )
            ) : (
              <input
                type="text"
                placeholder={t("placeholders.trainingUrl")}
                style={baseInputStyle}
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
              />
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginBottom: "20px",
          }}
        >
          <label style={{ fontSize: "14px", color: "white" }}>
            {t("labels.description")}
          </label>
          <EditorText
            content={formData.description}
            onChange={(html) => setFormData({ ...formData, description: html })}
          />
        </div>

        {activeTab === "Formations" && formData.type === "ACADEMY" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginBottom: "20px",
            }}
          >
            <label style={{ fontSize: "14px", color: "white" }}>
              {t("labels.document")}
            </label>

            <label
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                padding: "30px 20px",
                border: formData.file
                  ? "2px solid #E67E5F"
                  : "2px dashed rgba(255, 255, 255, 0.4)",
                borderRadius: "12px",
                backgroundColor: formData.file
                  ? "rgba(230, 126, 95, 0.1)"
                  : "rgba(255, 255, 255, 0.05)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(255,255,255,0.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = formData.file
                  ? "rgba(230, 126, 95, 0.1)"
                  : "rgba(255, 255, 255, 0.05)")
              }
            >
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                style={{ display: "none" }}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFormData({ ...formData, file: e.target.files[0] });
                  }
                }}
              />

              {formData.file ? (
                <>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "10px",
                      backgroundColor: "#E67E5F",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "22px",
                    }}
                  >
                    📄
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <p
                      style={{ color: "white", fontWeight: "bold", margin: 0 }}
                    >
                      {formData.file.name}
                    </p>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.6)",
                        fontSize: "12px",
                        margin: "4px 0 0",
                      }}
                    >
                      {(formData.file.size / 1024).toFixed(1)} Ko —{" "}
                      {t("documentBox.clickToChange")}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setFormData({ ...formData, file: undefined });
                    }}
                    style={{
                      backgroundColor: "rgba(255,100,100,0.2)",
                      border: "1px solid rgba(255,100,100,0.5)",
                      color: "#ff6b6b",
                      borderRadius: "6px",
                      padding: "4px 14px",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    {t("documentBox.removeFile")}
                  </button>
                </>
              ) : (
                <>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "22px",
                    }}
                  >
                    📎
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ color: "white", fontWeight: "500", margin: 0 }}>
                      {t("documentBox.clickToUpload")}
                    </p>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "12px",
                        margin: "4px 0 0",
                      }}
                    >
                      {t("documentBox.supportedFormats")}
                    </p>
                  </div>
                </>
              )}
            </label>
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "20px",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <label style={{ fontSize: "14px", color: "white" }}>
              {t("labels.date")}
            </label>
            <input
              type="date"
              style={{ ...baseInputStyle, colorScheme: "dark" }}
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
          </div>
          <button
            onClick={handleSave}
            disabled={loading}
            style={{
              ...buttonStyle,
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {loading && <Loader2 className="animate-spin" size={18} />}
            {editingId ? t("buttons.update") : t("buttons.save")}
          </button>
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: "24px", marginBottom: "20px", color: "white" }}>
          {activeTab === "Bourses"
            ? t("titles.listScholarships")
            : t("titles.listTrainings")}
        </h3>
        {loading && items.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "40px",
            }}
          >
            <Loader2 className="animate-spin" size={32} />
          </div>
        ) : items.length === 0 ? (
          <p style={{ textAlign: "center", opacity: 0.6, color: "white" }}>
            {t("messages.noData")}
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {!isMobile && (
              <div
                style={{
                  display: "flex",
                  padding: "10px 0",
                  borderBottom: "2px solid rgba(255, 255, 255, 0.3)",
                  marginBottom: "10px",
                  fontWeight: "bold",
                  fontSize: "14px",
                  textTransform: "uppercase",
                  opacity: 0.9,
                }}
              >
                <div style={{ flex: 2, color: "white" }}>
                  {t("headers.title")}
                </div>
                {activeTab === "Formations" && (
                  <div style={{ flex: 1, color: "white" }}>
                    {t("headers.type")}
                  </div>
                )}
                <div style={{ flex: 1, color: "white" }}>
                  {t("headers.date")}
                </div>
                <div style={{ flex: 0.5, textAlign: "right", color: "white" }}>
                  {t("headers.actions")}
                </div>
              </div>
            )}
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? "8px" : 0,
                  padding: "15px 0",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                  alignItems: isMobile ? "flex-start" : "center",
                }}
              >
                <div style={{ flex: 2, fontWeight: "500", color: "white" }}>
                  {item.title}
                </div>
                {activeTab === "Formations" && (
                  <div style={{ flex: 1, fontSize: "12px", color: "white" }}>
                    <span
                      style={{
                        backgroundColor:
                          (item as ITraining).type === "ACADEMY"
                            ? "#E67E5F"
                            : "rgba(255,255,255,0.2)",
                        padding: "4px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      {(item as ITraining).type === "ACADEMY"
                        ? t("options.academy")
                        : t("options.classic")}
                    </span>
                  </div>
                )}
                <div style={{ flex: 1, opacity: 0.8, color: "white" }}>
                  {formatDateFR(item.date)}
                </div>
                <div
                  style={{
                    flex: isMobile ? undefined : 0.5,
                    width: isMobile ? "100%" : undefined,
                    display: "flex",
                    gap: "15px",
                    justifyContent: isMobile ? "flex-start" : "flex-end",
                  }}
                >
                  <button
                    onClick={() => handleEditClick(item)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() =>
                      item.id &&
                      (setItemToDelete(item.id), setIsModalOpen(true))
                    }
                    style={{
                      background: "none",
                      border: "none",
                      color: "#ff6b6b",
                      cursor: "pointer",
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
