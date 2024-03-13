
const getCurrentTime = (user: string, hour: number): string => {
    const time: Array<{ range: number[], saludo: string }> = [
        { range: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], saludo: `Buen día, ${user?.split(' ')[0]}👋` },
        { range: [12, 13, 14, 15, 16, 17, 18], saludo: `Buena tarde, ${user?.split(' ')[0]}⛅` },
        { range: [19, 20, 21, 22, 23, 0], saludo: `Buena noche, ${user?.split(' ')[0]}🌛🌠` },
    ];

    const match = time.find(({ range }) => range.includes(hour));

    if (!match) return `Hola ${user.split(' ')[0]} 👋`;
    
    return match.saludo;
}


export default getCurrentTime;