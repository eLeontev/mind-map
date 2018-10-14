export let getNewBlock = (id, parentID) => ({
    id,
    parentID,
    isEditMode: true,
    hasChildren: false,
    value: '',
});