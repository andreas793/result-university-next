'use client'

import {ReactNode} from 'react';
import {Modal, ModalBody, ModalContent, ModalHeader} from "@heroui/modal";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    title: string;
}

const CustomModal = ({children, isOpen, onClose, size = 'xl', title}: IProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size={size}>
            <ModalContent>
                <ModalHeader className="border-b">
                    <h3 className="text-xl text-background font-semibold">{title}</h3>
                </ModalHeader>
                <ModalBody className="space-y-4 py-6">
                    {children}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CustomModal;