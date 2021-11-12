const customStyleSelect = {
    control: (provided, state) => ({
        ...provided,
        boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(245, 12, 125, 0.25) !important' : provided.boxShadow,
        borderColor: state.isFocused ? '#F50C7D !important' : provided.borderColor
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#F50C7D !important' : provided.backgroundColor,
        ':hover': {
            ...provided,
            backgroundColor: !state.isSelected ? 'rgba(245, 12, 125, 0.25) !important' : provided.backgroundColor,
            color: !state.isSelected ? 'black' : provided.color
        },
        ':not(:hover)': {
            ...provided,
            backgroundColor: 'white'
        }
    })
}

export default customStyleSelect;