type DialogButtonType = 'Yes' | 'No';

interface FormButtonType {
    type: 'Add' | 'Remove' | 'Buy'
}

type AnyButtonType = 'button' | 'submit' | 'reset';

type ConfirmationHandlingFormButton = {
    onConfirm: ((dialogButtonType: DialogButtonType) => void) | null
}