import { useState, useEffect, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "../../../context/Auth/AuthContext";
import { db } from "../../../utils/firebase";
import getCurrentTime from "../../../utils/getCurrentTime";

const Greeting = () => {

    const [time, setTime] = useState<number>(new Date().getHours());
    const [username, setUsername] = useState<string>('');
    const { user } = useAuth();

    const greeting = useMemo(() => getCurrentTime(username, time), [username, time]);

    const getUserData = useCallback(async () => {
        if (user) {
            const queryRef = query(collection(db, 'users'), where('user_uuid', '==', user.uid));
            const querySnapshot = await getDocs(queryRef);
            const userData = querySnapshot.docs[0].data();
            if (userData) {
                setUsername(userData.nameUser);
            }
        }
    }, [user]);
    
    useEffect(() => {
        getUserData();
    }, [getUserData]); 


    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().getHours());
        }, 1000); //3600000
        return () => clearInterval(timer);
    }, []);

    const today = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: .5, delay: 0.5, type: 'spring', stiffness: 100, damping: 20 }}
                exit={{ opacity: 0, x: -100 }}
                className="flex flex-col lg:p-6 lg:mt-5 font-Montserrat">
                <h1 className="font-bold lg:text-xl">{greeting}</h1>
                <p className="text-gray-400">{today}</p>
            </motion.div>
        </AnimatePresence>
    );
}

export default Greeting;
