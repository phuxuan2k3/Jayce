import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
} from "@mui/material";
import { format, formatDistanceToNow } from "date-fns";
import { useGetTransactionsMutation } from "../../../../features/auth/api/logout.api";
import { useLanguage } from "../../../../LanguageProvider";
import { enUS, vi } from "date-fns/locale";

interface TransactionHistoryDialogProps {
    open: boolean;
    onClose: () => void;
}

const TransactionHistoryDialog: React.FC<TransactionHistoryDialogProps> = ({ open, onClose }) => {
    const { t, language } = useLanguage();
    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState<{
        id: number;
        amount: number;
        note: string;
        created_at: string;
    }[]>([]);

    const [getTransactions] = useGetTransactionsMutation();

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const data = await getTransactions().unwrap();
            setTransactions(data.history);
        } catch (err) {
            console.error("Failed to fetch transactions", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open) fetchTransactions();
    }, [open]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle className="text-center font-bold text-xl mt-2">{t("settings_transactions_title")}</DialogTitle>
            <DialogContent className="p-6">
                {loading ? (
                    <div className="flex justify-center py-10">
                        <CircularProgress />
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {transactions.map((tx) => (
                            <div
                                key={tx.id}
                                className="rounded-xl p-5 bg-white shadow-md border hover:shadow-lg transition-all"
                            >
                                <div className="flex justify-between items-center">
                                    <div className="text-2xl font-bold text-[var(--primary-color)]">
                                        {tx.amount.toLocaleString()}
                                        <span className="text-sm text-gray-500 font-medium ml-1">SSC</span>
                                    </div>

                                    <div className="text-xs text-gray-500" title={format(new Date(tx.created_at), "PPpp", { locale: language === "vi" ? vi : enUS })}>
                                        {formatDistanceToNow(new Date(tx.created_at), { addSuffix: true, locale: language === "vi" ? vi : enUS })}
                                    </div>
                                </div>
                                <div className="mt-2 text-sm text-gray-600">
                                    <span className="font-medium">{t("settings_transactions_note")}:</span> {tx.note || t("settings_transactions_no_note")}
                                </div>
                            </div>
                        ))}

                        {transactions.length === 0 && !loading && (
                            <div className="text-center text-gray-500 mt-4 mb-4">
                                {t("settings_transactions_no_transactions")}
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
                    {t("settings_transactions_close")}
                </button>
            </DialogActions>
        </Dialog>
    );
};

export default TransactionHistoryDialog;
