export const convertDate = (date: string) => {
    const dateToTransform = new Date(date);
    const formateDate = dateToTransform.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
    return formateDate
}

export const convertDateReturnYears = (date: string) => {
    const dateToTransform = new Date(date);
    const formateDateYears = dateToTransform.toLocaleDateString('fr-FR', { year: 'numeric' });
    return formateDateYears
}