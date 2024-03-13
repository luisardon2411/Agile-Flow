import { createContext, useContext } from "react";


interface WaapiContextType {
    instanceID: number;
    token: string;
    sendMessage?: ( chatId: string, message: string, mentions?: string[] ) => void;
    sendMedia?: ( chatId: string, media: string, caption?: string ) => void;
    sendDocument?: ( chatId: string, document: string, caption?: string ) => void;
    sendLocation?: ( chatId: string, latitude: number, longitude: number, caption?: string ) => void;
}


const WaapiContext = createContext<WaapiContextType | undefined>(undefined);


export const useWaapi = () => {
    const context = useContext(WaapiContext);
    if (!context) {
        throw new Error('useWaapi must be used within a WaapiProvider');
    }
    return context;
};
