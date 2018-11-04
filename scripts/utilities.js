
function getAge(dateString) {
    var today = new Date();
    var assetDate = new Date(dateString);
    var age = today.getFullYear() - assetDate.getFullYear();
    var m = today.getMonth() - assetDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < assetDate.getDate())) {
        age--;
    }
    return age;
}