/**
 * Run outer function in data loop and (optional) store new data into db
 */
function handleDb(settings_field,new_value,skip_storing){
    var db = getDb(); //console.log(db.settings);
    db.settings[settings_field]=new_value;
    if(!skip_storing){
        setDb(db);
        return true;
    }else
        return db;
}
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
    console.dir(data);
    window.localStorage.setItem(db_name, JSON.stringify(data));
    console.log('data stored...');
    // re-set Matrix settings

}