export let getNewBlock = (id, parentID) => ({
    id,
    parentID,
    isEditMode: true,
    hasChildren: false,
    value: '',
});

const _getDescendantBlocks = (blocks, id) => {
    const descendants = blocks.filter(b => b.parentID === id);

    if (descendants.length > 0) {
        const deepDescendants = descendants
            .filter(d => d.hasChildren)
            .map(d => _getDescendantBlocks(blocks, d.id));

        return [ ...descendants, ...[].concat.apply([], deepDescendants)];
    }
    return [...descendants];
}

export let getDescendantBlocks = (blocks, id) => {
    const block = blocks.filter(b => b.id === id);
    const descendants = _getDescendantBlocks(blocks, id);


    return [...block, ...descendants];
};