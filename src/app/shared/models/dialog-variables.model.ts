export interface DialogVariables {
    title?: string,
    message?: {
        text: string,
        isCentered?: boolean
    },
    note?: {
        text: string,
        isCentered: boolean
    },
    cancelBtn?: {
        text: string
    },
    confirmBtn?: {
        text: string
    },
}