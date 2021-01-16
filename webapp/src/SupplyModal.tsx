import React from "react";
import Modal from "react-modal";
import { FaTimesCircle } from "react-icons/fa";
import "./SupplyModal.module.css";

interface SupplyModalProps
{
    onValidate:(e?:React.MouseEvent) => void;
    onCancel:(e?:React.MouseEvent) => void,
    isOpen:boolean;
}

export function SupplyModal(props:SupplyModalProps)
{
    return (
        <Modal isOpen={props.isOpen} style={styles.modal}>
            <FaTimesCircle className="closeButton" onClick={props.onCancel} />
            <div className="innerModal">
                <h2>Quantité demandée</h2>
                <form>
                    <input type="number" min="0" />
                    <button onClick={props.onValidate}>Valider</button>
                </form>
            </div>
        </Modal>
    );
}

const styles = {
    modal: {
        content: {
            margin: "auto",
            width: 400,
            height: 150
        },
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)"
        }
    }
};