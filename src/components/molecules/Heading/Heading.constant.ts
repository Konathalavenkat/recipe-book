export const CLASSES = {
    CENTER: 'flex flex-col gap-2 items-center justify-center',
    LEFT: 'flex flex-col gap-2 items-start justify-start',
    RIGHT: 'flex flex-col gap-2 items-end justify-end',
}

export const ALIGN_TYPES = {
    CENTER: 'center',
    LEFT: 'left',
    RIGHT: 'right',
}

export type AlignType = (typeof ALIGN_TYPES)[keyof typeof ALIGN_TYPES];

export const ALIGN_MAP = {
    [ALIGN_TYPES.CENTER]: CLASSES.CENTER,
    [ALIGN_TYPES.LEFT]: CLASSES.LEFT,
    [ALIGN_TYPES.RIGHT]: CLASSES.RIGHT,
}