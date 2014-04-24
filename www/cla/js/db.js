/**
 * Get data from DB
 */
function getDb(db_name){
    if(!db_name) db_name = 'settings';
    return JSON.parse(window.localStorage.getItem(db_name));
}
/**
 * Set data into DB
 */
function setDb(data,db_name){
    if(!db_name) db_name = 'settings';
    window.localStorage.setItem(db_name, JSON.stringify(data));
}