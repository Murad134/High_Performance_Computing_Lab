export function filterByLevel(dataset, level) {
    return dataset.filter(
        item => item.studentLevel.toLowerCase() === level.toLowerCase()
    );
}
