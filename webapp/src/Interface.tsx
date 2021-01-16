import React from "react";
import { FaUser, FaIndustry, FaBoxes, FaTruck, FaStore } from "react-icons/fa";
import Modal from "react-modal";
import { Chain } from "./Chain";
import { Infos } from "./Infos";
import { SupplyModal } from "./SupplyModal";
import classes from "./Interface.module.css";

interface PropsInterface
{
    role:number;
    infos:Infos;
}

export function Interface(props:PropsInterface)
{
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const generate = () => {
        return ([<FaIndustry />, <FaBoxes />, <FaTruck />, <FaStore />].map((icon, index) => {
            return (
                <div className={`${classes.role} ${props.role === index ? classes.me : classes.teammate}`} key={index}>
                    <FaUser /> | {icon}
                </div>
            );
        }));
    };
    
    return (
        <div className={classes.container}>
            <div className={classes.roleContainer}>
                {generate()}
            </div>
            <div>
                <Chain infos={props.infos} />
                <button onClick={() => setIsModalOpen(true)}>Effectuer une demande</button>
                <SupplyModal 
                    isOpen={isModalOpen}
                    onValidate={() => setIsModalOpen(false)}
                    onCancel={() => setIsModalOpen(false)}
                />
            </div>
        </div>
    )
}