export const addAdherent = adherent => ({
    type: 'ADD',
    payload: adherent
})

export const removeAdherent = adherent => ({
    type: 'REMOVE',
    payload: adherent
})