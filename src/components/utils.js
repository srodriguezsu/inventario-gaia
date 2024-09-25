export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export const translateStatus = (status) => {
    const statusTranslations = {
        'pending': 'Pendiente',
        'processing': 'En proceso',
        'on-hold': 'En espera',
        'completed': 'Completado',
        'cancelled': 'Cancelado',
        'refunded': 'Reembolsado',
        'failed': 'Fallido',
    };

    return statusTranslations[status] || status; // Si el estado no tiene traducción, se devuelve el original.
};