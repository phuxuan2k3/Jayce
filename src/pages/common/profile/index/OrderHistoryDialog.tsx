import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from "@mui/material";
import clsx from "clsx";
import { Order } from "../../../../features/payment/types/payment";
import { useListOrdersMutation, useGetOrderMutation } from "../../../../features/payment/api/payment.api";
import { formatDistanceToNow, format } from "date-fns";
import { enUS, vi } from "date-fns/locale";
import { useLanguage } from "../../../../LanguageProvider";

interface OrderHistoryDialogProps {
    open: boolean;
    onClose: () => void;
}

const OrderHistoryDialog: React.FC<OrderHistoryDialogProps> = ({ open, onClose }) => {
    const { t, language } = useLanguage();
    console.log(language);
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);

    const [statusFilter, setStatusFilter] = useState("ALL");
    const [sortOrder, setSortOrder] = useState<"DESC" | "ASC">("DESC");

    const filteredOrders = orders
        .filter(order => statusFilter === "ALL" || order.status === statusFilter)
        .sort((a, b) => {
            const aTime = new Date(a.createdat.Time).getTime();
            const bTime = new Date(b.createdat.Time).getTime();
            return sortOrder === "DESC" ? bTime - aTime : aTime - bTime;
        });

    const [listOrders] = useListOrdersMutation();
    const [getOrder] = useGetOrderMutation();

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const data = await listOrders().unwrap();
            console.log("Fetched orders:", data);

            const sortedData = [...data].sort(
                (a, b) => new Date(b.createdat.Time).getTime() - new Date(a.createdat.Time).getTime()
            );

            setOrders(sortedData);
        } catch (err) {
            console.error("Failed to fetch orders", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open) fetchOrders();
    }, [open]);

    const handleOrderClick = async (order: Order) => {
        if (order.status !== "PENDING") return;

        try {
            console.log("Fetching payment link for order:", order.id);
            const data = await getOrder(order.id).unwrap();
            console.log("Payment link data:", data);
            window.open(`https://pay.payos.vn/web/${data.id}`, "_blank");
        } catch (err) {
            console.error("Failed to fetch payment link info", err);
        }
    };

    const convertToSSC = (amount: number): number => {
        switch (amount) {
            case 60000: return 60;
            case 120000: return 120;
            case 170000: return 180;
            case 220000: return 240;
            case 1200000: return 1440;
            default: return 1;
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle className="text-center font-bold text-xl mt-2">{t("settings_topup_history_title")}</DialogTitle>
            <DialogContent className="p-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <label className="text-gray-800 text-sm">{t("settings_topup_history_status")}:</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="border rounded-md p-2"
                        >
                            <option value="ALL">{t("settings_order_status_all")}</option>
                            <option value="PENDING">{t("settings_order_status_pending")}</option>
                            <option value="PAID">{t("settings_order_status_paid")}</option>
                            <option value="EXPIRED">{t("settings_order_status_expired")}</option>
                            <option value="CANCELLED">{t("settings_order_status_cancelled")}</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-gray-800 text-sm">{t("settings_topup_history_sort")}:</label>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value as "ASC" | "DESC")}
                            className="border rounded-md p-2"
                        >
                            <option value="DESC">{t("settings_topup_history_sort_newest")}</option>
                            <option value="ASC">{t("settings_topup_history_sort_oldest")}</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-10">
                        <CircularProgress />
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {filteredOrders.map((order) => {
                            const isPending = order.status === "PENDING";

                            return (
                                <div
                                    key={order.id}
                                    onClick={() => isPending && handleOrderClick(order)}
                                    className={clsx(
                                        "rounded-xl p-5 bg-white shadow-md transition-all duration-200 relative border hover:shadow-lg group",
                                        isPending
                                            ? "cursor-pointer hover:ring-2 hover:ring-yellow-400"
                                            : "cursor-default"
                                    )}
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-bold text-[var(--primary-color)]">
                                                {convertToSSC(order.amount.Int32).toLocaleString()}
                                            </span>
                                            <span className="text-sm text-gray-500 font-medium">SSC</span>
                                        </div>

                                        <div
                                            className={clsx(
                                                "text-xs font-semibold rounded-full px-3 py-1 text-white",
                                                order.status === "CANCELLED" && "bg-red-600",
                                                order.status === "PENDING" && "bg-yellow-600",
                                                order.status === "PAID" && "bg-green-600",
                                                order.status === "EXPIRED" && "bg-gray-500"
                                            )}
                                        >
                                            {t(order.status)}
                                        </div>
                                    </div>

                                    <div className="mt-4 space-y-1 text-sm text-gray-600">
                                        <div title={format(new Date(order.createdat.Time), "PPpp", { locale: language === "vi" ? vi : enUS })}>
                                            <span className="font-medium">{t("settings_topup_order_created_at")}:</span>{" "}
                                            {formatDistanceToNow(new Date(order.createdat.Time), {
                                                addSuffix: true,
                                                locale: language === "vi" ? vi : enUS,
                                            })}
                                        </div>
                                        {(order.status === "PAID" || order.status === "EXPIRED") && (
                                            <div title={format(new Date(order.updatedat.Time), "PPpp", { locale: language === "vi" ? vi : enUS })}>
                                                <span className="font-medium">
                                                    {order.status === "PAID" ? `${t("settings_order_status_paid")}:` : `${t("settings_order_status_expired")}:`}
                                                </span>{" "}
                                                {formatDistanceToNow(new Date(order.updatedat.Time), {
                                                    addSuffix: true,
                                                    locale: language === "vi" ? vi : enUS,
                                                })}
                                            </div>
                                        )}
                                    </div>

                                    {isPending && (
                                        <div className="absolute bottom-5 right-6 text-xs text-yellow-600 font-semibold animate-pulse">
                                            {t("settings_topup_click_to_pay")}
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {filteredOrders.length === 0 && !loading && (
                            <div className="text-center text-gray-500 mt-4 mb-4">
                                {t("settings_topup_no_orders")}
                            </div>
                        )}
                    </div>
                )}
            </DialogContent>
            <DialogActions className="flex justify-center pb-6">
                <button
                    onClick={onClose}
                    className="w-1/2 px-4 py-2 border border-[var(--primary-color)] font-bold text-[var(--primary-color)] rounded-lg"
                >
                    {t("settings_topup_close")}
                </button>
            </DialogActions>
        </Dialog>
    );
};

export default OrderHistoryDialog;