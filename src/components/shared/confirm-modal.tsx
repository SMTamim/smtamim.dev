import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { AlertTriangle, Info, CheckCircle } from 'lucide-react';

interface ConfirmModalProps {
    trigger: React.ReactNode;
    title?: string;
    description?: React.ReactNode | string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    variant?: 'default' | 'destructive' | 'warning' | 'info';
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    trigger,
    title = "Are you sure?",
    description = "This action cannot be undone.",
    confirmText = "Continue",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    variant = "default"
}) => {
    const getIcon = () => {
        switch (variant) {
            case 'destructive':
                return <AlertTriangle className="h-4 w-4 text-red-600" />;
            case 'warning':
                return <AlertTriangle className="h-4 w-4 text-amber-600" />;
            case 'info':
                return <Info className="h-4 w-4 text-blue-600" />;
            default:
                return <CheckCircle className="h-4 w-4 text-green-600" />;
        }
    };

    const getConfirmButtonVariant = () => {
        switch (variant) {
            case 'destructive':
                return 'destructive';
            case 'warning':
                return 'default';
            case 'info':
                return 'default';
            default:
                return 'default';
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {trigger}
            </AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-[425px]">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                        {getIcon()}
                        {title}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onCancel}>
                        {cancelText}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className={getConfirmButtonVariant() === 'destructive' ? 'bg-red-500 text-white hover:bg-red-700' : ''}
                    >
                        {confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
export default ConfirmModal;