export const runtimeFormatter = (runtime: number) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    if(hours === 0) return `${minutes}min`;
    
    return `${hours}h ${minutes}min`;
}