import React from "react";
import { FaUser, FaIndustry, FaBoxes, FaTruck, FaStore } from "react-icons/fa";
import "./Interface.css";

interface PropsInterface
{
    role:number;
}

export function Interface(props:PropsInterface)
{
    const generate = () => {
        return ([<FaIndustry />, <FaBoxes />, <FaTruck />, <FaStore />].map((icon, index) => {
            return (
                <div style={styles.roleContainer} className={props.role === index ? "me" : "teammate"}>
                    <div style={styles.icon}><FaUser /> | {icon}</div>
                </div>
            );
        }));
    };
    
    return (
        <div style={styles.container}>
            <div>
                {generate()}
            </div>
        </div>
    )
}

const styles = {
    container: {
        margin: "auto",
        width: "80%",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20
    },
    roleContainer: {

    },
    icon: {
        fontSize: 60
    }
};