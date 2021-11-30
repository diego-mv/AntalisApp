export const requiredSelect = (select_ref, alert_required) => {
    let select = select_ref.current.getValue();
    const select_control = select_ref.current.controlRef;
    if(select_control) { select_control.classList.remove('required-field'); }
    if(!select.length) {
        alert_required = true;
        if(select_control) { select_control.classList.add('required-field'); }
    } 
}